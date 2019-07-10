import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Route } from '../models/Route';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  authedUser: User;
  userRoutes: Route[];
  
  constructor() { }
}
