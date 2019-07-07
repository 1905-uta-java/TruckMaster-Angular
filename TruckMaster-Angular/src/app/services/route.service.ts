import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PendingService } from './pending.service';
import { Route } from '../models/Route';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  uri: string = "/routes";
  
  constructor(private http: HttpClient, private pendingService: PendingService) { }

  getRoute(id: number, onSuccess: (route : Route) => void, onFailure: (any) => void) {

    this.pendingService.pendingEvent.emit(true);

    this.http.get<Route>(environment.serverUrl + this.uri + "/" + id)
      .toPromise()
      .then((route) => {
        this.pendingService.pendingEvent.emit(false);
        onSuccess(route);
      })
      .catch((error) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }
}
