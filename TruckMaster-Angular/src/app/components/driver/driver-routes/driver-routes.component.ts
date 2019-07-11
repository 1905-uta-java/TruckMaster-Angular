import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/Route';
import { HttpErrorResponse } from '@angular/common/http';
import { CacheService } from 'src/app/services/cache.service';
import { PendingService } from 'src/app/services/pending.service';

@Component({
  selector: 'app-driver-routes',
  templateUrl: './driver-routes.component.html',
  styleUrls: ['./driver-routes.component.css']
})
export class DriverRoutesComponent implements OnInit {

  errorMessage: string = null;
  isPending: boolean = false;

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

    this.rService.getRoutesForDriver(
      (routes: Route[]) => {
        this.cache.routes = routes;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    );
  }
}
