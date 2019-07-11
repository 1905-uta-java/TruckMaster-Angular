import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PendingService } from './pending.service';
import { Route } from '../models/Route';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
// each method of this service class sends a specific kind of http request
// they each also indicate, through the PendingService, when they are
// waiting for a response. Each accepts an onSuccess and onFailure callback
// to handle the response
export class RouteService {
  
  uri: string = "/routes";
  
  constructor(
    private http: HttpClient,
    private pendingService: PendingService,
    private cache: CacheService) { }

  getRoute(id: number, onSuccess: (route : Route) => void, onFailure: (any) => void) {

    this.pendingService.pendingEvent.emit(true);

    this.http.get<Route>(
      environment.serverUrl + this.uri + "/" + id,
      {
        headers: new HttpHeaders()
          .set("token", sessionStorage.getItem("authToken"))
      })
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
  
  getRoutesForDriver(onSuccess: (routes : Route[]) => void, onFailure: (error: HttpErrorResponse) => void) {

    this.pendingService.pendingEvent.emit(true);

    this.http.get<Route[]>(
      environment.serverUrl + this.uri + "/get-routes-driver-" + this.cache.authedUser.id,
      {
        headers: new HttpHeaders()
          .set("token", sessionStorage.getItem("authToken"))
      })
      .toPromise()
      .then((routes: Route[]) => {
        this.pendingService.pendingEvent.emit(false);
        onSuccess(routes);
      })
      .catch((error: HttpErrorResponse) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }

  getRoutesForManager(onSuccess: (routes : Route[]) => void, onFailure: (error: HttpErrorResponse) => void) {

    this.pendingService.pendingEvent.emit(true);

    this.http.get<Route[]>(
      environment.serverUrl + this.uri + "/get-all-routes+managerid-" + this.cache.authedUser.id,
      {
        headers: new HttpHeaders()
          .set("token", sessionStorage.getItem("authToken"))
      })
      .toPromise()
      .then((routes: Route[]) => {
        this.pendingService.pendingEvent.emit(false);
        onSuccess(routes);
      })
      .catch((error: HttpErrorResponse) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }
  
  updateRoute(route: Route, onSuccess: (route: Route) => void, onFailure: (any) => void) {

    this.pendingService.pendingEvent.emit(true);

    this.http.put<Route>(environment.serverUrl + this.uri,
      route,
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("token", sessionStorage.getItem("authToken"))
      })
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
  
  createRoute(route: Route, onSuccess: (route: Route) => void, onFailure: (any) => void) {
    
    this.pendingService.pendingEvent.emit(true);
    
    this.http.post<Route>(environment.serverUrl + this.uri,
      route,
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("token", sessionStorage.getItem("authToken"))  
      })
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

  deleteRoute(routeId: number, onSuccess: (route: Route) => void, onFailure: (any) => void) {
    
    this.pendingService.pendingEvent.emit(true);

    this.http.delete<Route>(
      environment.serverUrl + this.uri + "/" + routeId,
      {
        headers: new HttpHeaders()
          .set("token", sessionStorage.getItem("authToken"))  
      })
      .toPromise()
        .then((route) => {
          console.log("success?");
          console.log(route);
          this.pendingService.pendingEvent.emit(false);
          onSuccess(route);
        })
        .catch((error) => {
          console.log("failure: " + error);
          this.pendingService.pendingEvent.emit(false);
          onFailure(error);
        });
  }
}
