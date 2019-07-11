import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { PendingService } from 'src/app/services/pending.service';
import { CacheService } from 'src/app/services/cache.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isPending: boolean = false;

  user: User;
  errorCode: number;

  constructor(
    private pendingService: PendingService,
    private cache: CacheService,
    private uService: UsersService
    ) { }

  ngOnInit() {

    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });

    this.user = this.cache.authedUser;
  }

  getUserProfile() {

    this.errorCode = null;

    this.uService.getUserProfile(
      this.user.id,
      (user) => {
        
        this.user = user;
      },
      (error: HttpErrorResponse) => {
        
        this.errorCode = error.status;
      });
  }

  updateProfile() {
    
    this.errorCode = null;

    this.uService.updateUserProfile(
      this.user,
      (user) => {

        this.user = user;
      },
      (error: HttpErrorResponse) => {

        this.errorCode = error.status;
      });
  }
}
