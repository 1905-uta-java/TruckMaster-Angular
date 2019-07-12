import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from 'src/app/models/Route';
import { CacheService } from 'src/app/services/cache.service';
import { PendingService } from 'src/app/services/pending.service';
import { RouteNode } from 'src/app/models/RouteNode';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-manager-routes',
  templateUrl: './manager-routes.component.html',
  styleUrls: ['./manager-routes.component.css']
})
export class ManagerRoutesComponent implements OnInit {

  errorMessage: string = null;
  isPending: boolean = false;

  selectedRoute: Route = null;
  selectedRouteIndex: number = null;
  selectedNodeIndex: number = null;
  assignedDriverId: number = null;

  selectedForecast;

  constructor(
    private rService: RouteService,
    private cache: CacheService,
    private pendingService: PendingService,
    private router: Router,
    private weatherService: WeatherService,
    private dService: DriverService) { }

  ngOnInit() {

    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });

    if(!this.cache.routes || this.cache.routes.length === 0)
      this.getRoutes();
    
    if(!this.cache.drivers || this.cache.drivers.length === 0)
      this.getDrivers();

    // this.selectedForecast = {
    //   dt: 1562900400,
    //   main: {
    //     temp: 289.58,
    //     temp_min: 289.58,
    //     temp_max: 289.604,
    //     pressure: 1012.43,
    //     sea_level: 1012.43,
    //     grnd_level: 1007.52,
    //     humidity: 82,
    //     temp_kf: -0.02
    //   },
    //   weather: [
    //     {
    //       id: 500,
    //       main: "Rain",
    //       description: "light rain",
    //       icon: "10n"
    //     }
    //   ],
    //   clouds: {
    //     all: 75
    //   },
    //   wind: {
    //     speed: 2.93,
    //     deg: 279.992
    //   },
    //   rain: {
    //     "3h": 0.062
    //   },
    //   sys: {
    //     pod: "n"
    //   },
    //   dt_txt: "2019-07-12 03:00:00"
    // };
  }

  getRoutes() {

    this.errorMessage = null;

    this.rService.getRoutesForManager(
      (routes: Route[]) => {
        this.cache.routes = routes;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    );
  }

  getDrivers() {

    this.errorMessage = null;

    this.dService.getDriversForManager(
      this.cache.authedUser.id,
      (drivers: Driver[]) => {
        this.cache.drivers = drivers;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    )
  }

  selectRoute(route: Route) {
    this.selectedRoute = route;
    this.selectedRouteIndex = this.cache.routes.indexOf(route);
    this.getForecast(this.selectedRoute.nodes[0]);
  }

  
  newRoute() {
    
    this.selectedRoute = {
      id: null,
      description: "",
      idealStartTime: new Date(),
      nodes: [
        {
          id: null,
          location: ""
        },
        {
          id: null,
          location: ""
        }
      ]
    };
    
    this.selectedRouteIndex = -1;

    this.getForecast(this.selectedRoute.nodes[0]);
  }

  submit() {
    
    this.errorMessage = null;

    // a non-negative selectedRouteIndex means that the 
    // selectedRoute alread exists in the database and
    // we are updating not creating it
    if(this.selectedRouteIndex > -1) {

      this.rService.updateRoute(
        this.selectedRoute,
        (route: Route) => {

          if(this.assignedDriverId != null) {

          this.rService.assignDriverToRoute(
            this.assignedDriverId,
            route,
            (route: Route) => {
              this.closeEditRoute();
            },
            (error: HttpErrorResponse) => {
              this.errorMessage = error.message;
            });

          } else {

            this.closeEditRoute();
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      );

    } else {

      this.rService.createRoute(
        this.selectedRoute,
        (route: Route) => {
          
          this.closeEditRoute();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  deleteRoute() {
    
    if(this.selectedRouteIndex > -1) {
      this.rService.deleteRoute(
        this.selectedRoute.id,
        (route: Route) => {
          this.closeEditRoute();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  moveNodeUp(node: RouteNode) {
    
    let index = this.selectedRoute.nodes.indexOf(node);

    if(index > 0) {
      this.selectedRoute.nodes[index] = this.selectedRoute.nodes[index - 1];
      this.selectedRoute.nodes[index - 1] = node;
    }
  }

  moveNodeDown(node: RouteNode) {

    let index = this.selectedRoute.nodes.indexOf(node);

    if((index < this.selectedRoute.nodes.length - 1) && (index > -1)) {
      this.selectedRoute.nodes[index] = this.selectedRoute.nodes[index + 1];
      this.selectedRoute.nodes[index + 1] = node;
    }
  }

  deleteNode(node: RouteNode) {

    let index = this.selectedRoute.nodes.indexOf(node);

    if((this.selectedRoute.nodes.length > 2) && (index > -1)) {
      this.selectedRoute.nodes.splice(index, 1);
    }

    if(this.selectedRouteIndex >= (this.selectedRoute.nodes.length - 1))
      this.getForecast(this.selectedRoute.nodes[this.selectedRoute.nodes.length - 1]);
  }

  newNode() {

    this.selectedRoute.nodes.push({
      id: null,
      location: ""
    });
  }

  closeEditRoute() {
    this.selectedRoute = null;
    this.selectedRouteIndex = null;
    this.selectedForecast = null;
    this.assignedDriverId = null;
    this.getRoutes();
  }

  getPrevForecast() {

    if(this.selectedNodeIndex > 0)
      this.getForecast(this.selectedRoute.nodes[this.selectedNodeIndex - 1]);
  }

  getNextForecast() {

    if(this.selectedNodeIndex < this.selectedRoute.nodes.length - 1)
      this.getForecast(this.selectedRoute.nodes[this.selectedNodeIndex + 1]);
  }

  getForecast(node: RouteNode) {
    
    this.errorMessage = null;

    this.weatherService.getForecasts(
      node.location,
      (result) => {
        this.selectedForecast = result.list[0];
        this.selectedNodeIndex = this.selectedRoute.nodes.indexOf(node);
      },
      (error) => {
        this.selectedNodeIndex = this.selectedRoute.nodes.indexOf(node);
        this.selectedForecast = {
          main: {
            temp: "--",
            temp_min: "--",
            temp_max: "--"
          },
          weather: [
            {
              main: "Location not found"
            }
          ]
        }
      });
  }
}
