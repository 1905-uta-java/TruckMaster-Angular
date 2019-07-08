import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/Route';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isPending: boolean = false;

  routeId: number;
  route: Route;
  errorMessage: string;

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
    this.errorMessage = null;
    
    this.routeService.getRoute(this.routeId,
      (route) => {
        this.route = route;
        console.log(route);
      },
      (error) => {
        this.errorMessage = error.errorMessage;
      });
  }

  addNode() {
    console.log("addNode");
  }

  removeNode() {
    console.log("removeNode");
  }
  
  updateRoute() {
    console.log("updateRoute");
  }

  deleteRoute() {
    console.log("deleteRoute");
  }

  createRoute() {
    console.log("creatRoute");
  }
}
