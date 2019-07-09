import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { PendingService } from 'src/app/services/pending.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  isPending: boolean = false;

  userId: number;
  user: User;
  
  errorCode: number;

  constructor(private pendingService: PendingService, private userService: UsersService) { }

  ngOnInit() {

    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
  }

  getUserProfile() {
    
    this.user = null;
    this.errorCode = null;

    this.userService.getUserProfile(this.userId,
      (user) => {
        this.user = user;
        console.log(user);
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      });
  }

  updateUserProfile() {
    
    this.errorCode = null;

    this.userService.updateUserProfile(this.user,
      (user) => {
        this.user = user;
        console.log(user);
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      });
  }
}
