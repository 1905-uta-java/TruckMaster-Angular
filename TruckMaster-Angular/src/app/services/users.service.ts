import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PendingService } from './pending.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri: string = "/profile-user";
  constructor(private http: HttpClient, private pendingService: PendingService) { }

  getUserProfile(id: number, onSuccess: (user : User) => void, onFailure: (any) => void) {
    this.pendingService.pendingEvent.emit(true); //other processes must wait until service returns success or failure

    this.http.get<User>(
      environment.serverUrl + this.uri + "/userid-" + id, //putting in id in the full url path
      {
        headers: new HttpHeaders()
          .set("token", sessionStorage.getItem("authToken"))
      }).toPromise()
      .then((user) => {
        this.pendingService.pendingEvent.emit(false); //no longer waiting, bc a response has been received
        onSuccess(user);
      })
      .catch((error) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }

  updateUserProfile(user: User, onSuccess: (user : User) => void, onFailure: (any) => void) {
    this.pendingService.pendingEvent.emit(true); //other processes must wait until service returns success or failure

    this.http.put<User>(environment.serverUrl + this.uri,
      user,
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("token", sessionStorage.getItem("authToken"))
      }) //putting in id in the full url path
      .toPromise()
      .then((user) => {
        this.pendingService.pendingEvent.emit(false); //no longer waiting, bc a response has been received
        onSuccess(user);
      })
      .catch((error) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }
}
