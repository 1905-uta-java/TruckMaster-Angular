import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  pendingEvent: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }
}
