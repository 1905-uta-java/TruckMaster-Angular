import { Injectable } from '@angular/core';
import { PendingService } from './pending.service';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manager } from '../models/Manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  uri: string = "/manager";

  constructor(private http: HttpClient, private pendingService: PendingService) { }

  createManager(manager: Manager, password: string, onSuccess: (manager: Manager) => void, onFailure: (error: HttpErrorResponse) => void) {

    this.pendingService.pendingEvent.emit(true);

    let body = new HttpParams()
      .set("manager", JSON.stringify(manager))
      .set("password", password);

    this.http.post<Manager>(
      environment.serverUrl + this.uri,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/x-www-form-urlencoded")
          .set("token", sessionStorage.getItem("authToken"))
      }).toPromise()
        .then((manager: Manager) => {
          this.pendingService.pendingEvent.emit(false);
          onSuccess(manager);
        })
        .catch((error: HttpErrorResponse) => {
          this.pendingService.pendingEvent.emit(false);
          onFailure(error);
        });
  }
}
