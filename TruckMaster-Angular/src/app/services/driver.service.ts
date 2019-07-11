import { Injectable } from '@angular/core';
import { PendingService } from './pending.service';
import { HttpErrorResponse, HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/Driver';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  uri: string = "/driver";

  constructor(
    private http: HttpClient,
    private pendingService: PendingService,
    private cache: CacheService) { }
    
  addDriver(driver: Driver, password: string, onSuccess: (driver: Driver) => void, onFailure: (error: HttpErrorResponse) => void ) {

    this.pendingService.pendingEvent.emit(true);

    let body = new HttpParams()
      .set("driver", JSON.stringify(driver))
      .set("password", password);
    
    this.http.post<Driver>(
      environment.serverUrl + this.uri + "/add-driver-managerid-" + this.cache.authedUser.id,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("token", sessionStorage.getItem("authtoken"))
      }).toPromise()
      .then((driver: Driver) => {
        this.pendingService.pendingEvent.emit(false);
        onSuccess(driver);
      })
      .catch((error: HttpErrorResponse) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }
  
  getDriversForManager(managerId: number, onSuccess: (driver: Driver[]) => void, onFailure: (error: HttpErrorResponse) => void) {

    this.pendingService.pendingEvent.emit(true);

    this.http.get<Driver[]>(
      environment.serverUrl + this.uri + "/get-all-drivers-managerid-" + managerId,
      {
        headers: new HttpHeaders()
          .set("token", sessionStorage.getItem("authToken"))
      })
      .toPromise()
      .then((drivers: Driver[]) => {
        this.pendingService.pendingEvent.emit(false);
        onSuccess(drivers);
      })
      .catch((error: HttpErrorResponse) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }
}
