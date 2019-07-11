import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from 'src/app/models/Route';
import { CacheService } from 'src/app/services/cache.service';
import { PendingService } from 'src/app/services/pending.service';
import { RouteNode } from 'src/app/models/RouteNode';

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

  constructor(
    private rService: RouteService,
    private cache: CacheService,
    private pendingService: PendingService) { }

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

    this.rService.getRoutesForManager(
      (routes: Route[]) => {
        this.cache.routes = routes;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    );
  }

  selectRoute(route: Route) {
    this.selectedRoute = route;
    this.selectedRouteIndex = this.cache.routes.indexOf(route);
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

          this.cache.routes[this.selectedRouteIndex] = route;
          this.selectedRoute = null;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      );

    } else {

      this.rService.createRoute(
        this.selectedRoute,
        (route: Route) => {
          
          this.cache.routes.push(route);
          this.selectedRoute = null;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  cancel() {
    this.selectedRoute = null;
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
  }

  newNode() {

    this.selectedRoute.nodes.push({
      id: null,
      location: ""
    });
  }
}
