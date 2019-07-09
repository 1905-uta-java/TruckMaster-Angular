import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/Route';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isPending: boolean = false;

  routeId: number;
  route: Route;
  errorCode: number;

  constructor(private pendingService: PendingService, private routeService: RouteService) { }
  
  ngOnInit() {
    
    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
  }

  getRoute() {
    this.route = null;
    this.errorCode = null;
    
    this.routeService.getRoute(this.routeId,
      (route) => {
        this.route = route;
        console.log(route);
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      });
  }

  addNode() {
    this.route.nodes.push({
      id: 0,
      location: ""
    });
  }

  removeNode() {
    this.route.nodes.pop();
  }
  
  updateRoute() {
    this.errorCode = null;

    this.routeService.updateRoute(
      this.route,
      (route) => {
        this.route = route;
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      }
    )
  }

  deleteRoute() {
    
    this.errorCode = null;

    this.routeService.deleteRoute(
      this.route.id,
      (route) => {
        this.routeId = null;
        this.route = null;
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      }
    )
  }

  createRoute() {

    this.errorCode = null;
    this.route = null;
    this.routeId = null;

    this.routeService.createRoute(
      {
        id: 0,
        description: "",
        idealStartTime: new Date(),
        nodes: [
          {
            id: 0,
            location: ""
          },
          {
            id: 0,
            location: ""
          }
        ]
      },
      (route) => {
        this.route = route;
        this.routeId = route.id;
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      }
    )
  }
}
