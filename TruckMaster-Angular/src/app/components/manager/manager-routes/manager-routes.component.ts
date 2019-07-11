import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from 'src/app/models/Route';
import { CacheService } from 'src/app/services/cache.service';
import { PendingService } from 'src/app/services/pending.service';

@Component({
  selector: 'app-manager-routes',
  templateUrl: './manager-routes.component.html',
  styleUrls: ['./manager-routes.component.css']
})
export class ManagerRoutesComponent implements OnInit {

  errorMessage: string = null;
  isPending: boolean = false;

  selectedRoute: Route = null;

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
    console.log(route);
  }

  submit() {
    console.log("submit");
    this.selectedRoute = null;
  }

  cancel() {
    console.log("cancel");
    this.selectedRoute = null;
  }
}
