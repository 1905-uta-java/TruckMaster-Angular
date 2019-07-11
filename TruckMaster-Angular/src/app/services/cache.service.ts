import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Route } from '../models/Route';
import { Driver } from '../models/Driver';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  authedUser: User;
  routes: Route[];
  drivers: Driver[];

  constructor() { }

  clear() {
    this.authedUser = null;
    this.routes = null;
    this.drivers = null;
  }
}
