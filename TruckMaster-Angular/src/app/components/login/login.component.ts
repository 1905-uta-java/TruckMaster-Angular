import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CacheService } from 'src/app/services/cache.service';
import { PendingService } from 'src/app/services/pending.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResult } from 'src/app/models/AuthResult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isPending: boolean = false;

  showErrMessage: boolean = false;

  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private cache: CacheService,
    private pendingService: PendingService,
    private router: Router
    ) { }

  ngOnInit() {
    
    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
  }

  login() {
    
    this.showErrMessage = false;

    this.loginService.login(
      this.username,
      this.password,
      (result: AuthResult) => {

        this.cache.authedUser = result.user;
        sessionStorage.setItem("authToken", result.token);

        if(this.cache.authedUser.userType === "ADMIN") {
          this.router.navigate(["admin-homepage"]);
        } else if(this.cache.authedUser.userType === "MANAGER") {
          this.router.navigate(["manager-homepage"]);
        } else if(this.cache.authedUser.userType === "DRIVER") {
          this.router.navigate(["driver-homepage"]);
        } else {
          this.cache.clear();
          sessionStorage.clear();
          this.router.navigate([""]);
        }
      },
      (error: HttpErrorResponse) => {

        this.showErrMessage = true;
      });
  }
}
