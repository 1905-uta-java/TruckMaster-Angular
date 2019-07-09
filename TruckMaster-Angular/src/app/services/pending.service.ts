import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// This class is used to indicate accross the application whether or not
// any part of the application is currently waiting for an Http response
// from the server, in which case the interactive elements of the
// web page should be inactive
export class PendingService {
  
  // this event emitter sends the boolean value provided to it's
  // emit() method, which triggers all callbacks subscribed to it
  pendingEvent: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }
}
