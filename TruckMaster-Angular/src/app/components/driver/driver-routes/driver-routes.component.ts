import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/models/Route';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-driver-routes',
  templateUrl: './driver-routes.component.html',
  styleUrls: ['./driver-routes.component.css']
})
export class DriverRoutesComponent implements OnInit {

  constructor(private rService: RouteService) { }

  ngOnInit() {
  }
  
  getRoutes() {

    this.rService.getRoutesForDriver(
      (routes: Route[]) => {
        console.log(routes);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
