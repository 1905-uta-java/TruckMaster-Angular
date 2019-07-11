import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from 'src/app/models/Route';

@Component({
  selector: 'app-manager-routes',
  templateUrl: './manager-routes.component.html',
  styleUrls: ['./manager-routes.component.css']
})
export class ManagerRoutesComponent implements OnInit {

  constructor(private rService: RouteService) { }

  ngOnInit() {
  }

  getRoutes() {

    this.rService.getRoutesForManager(
      (routes: Route[]) => {
        console.log(routes);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
