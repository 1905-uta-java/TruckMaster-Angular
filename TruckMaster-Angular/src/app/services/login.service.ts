import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PendingService } from './pending.service';
import { AuthResult } from '../models/AuthResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri: string = "/authenticate";

  constructor(private http: HttpClient, private pendingService: PendingService) { }

  login(username: string, password: string, onSuccess: (result: AuthResult) => void, onFailure: (any) => void) {

    this.pendingService.pendingEvent.emit(true);

    let body = new HttpParams()
      .set("username", username)
      .set("password", password);

    this.http.post<AuthResult>(environment.serverUrl + this.uri,
      body.toString(),
      {
        headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
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
}
