import { Component, OnInit } from '@angular/core';
import { PendingService } from './services/pending.service';
import { CacheService } from './services/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  
  isPending: boolean = false;

  constructor(private pendingService: PendingService, private cache: CacheService, private router: Router) { }
  
  ngOnInit() {
    
    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
    
    if(!this.isLoggedIn()) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['profile']);
    }
  }

  isLoggedIn() {
    return Boolean(this.cache.authedUser);
  }
  
  logout() {
    this.cache.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
