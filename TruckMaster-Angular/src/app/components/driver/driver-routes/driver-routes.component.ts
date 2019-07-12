import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/Route';
import { HttpErrorResponse } from '@angular/common/http';
import { CacheService } from 'src/app/services/cache.service';
import { PendingService } from 'src/app/services/pending.service';
import { WeatherService } from 'src/app/services/weather.service';
import { RouteNode } from 'src/app/models/RouteNode';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/models/Driver';

@Component({
  selector: 'app-driver-routes',
  templateUrl: './driver-routes.component.html',
  styleUrls: ['./driver-routes.component.css']
})
export class DriverRoutesComponent implements OnInit {

  errorMessage: string = null;
  isPending: boolean = false;

  selectedRoute: Route = null;
  selectedRouteIndex: number = null;
  selectedNodeIndex: number = null;

  selectedForecast = null;

  constructor(
    private rService: RouteService,
    private cache: CacheService,
    private pendingService: PendingService,
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
  }

  getRoutes() {

    this.errorMessage = null;

    this.rService.getRoutesForDriver(
      (routes: Route[]) => {
        this.cache.routes = routes;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    );
  }

  closeEditRoute() {
    this.selectedRoute = null;
    this.selectedRouteIndex = null;
    this.selectedForecast = null;
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

  selectRoute(route: Route) {
    this.selectedRoute = route;
    this.selectedRouteIndex = this.cache.routes.indexOf(route);
    this.getForecast(this.selectedRoute.nodes[0]);
  }
}
