import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';
import { Manager } from 'src/app/models/Manager';
import { ManagerService } from 'src/app/services/manager.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-view-managers',
  templateUrl: './admin-view-managers.component.html',
  styleUrls: ['./admin-view-managers.component.css']
})
export class AdminViewManagersComponent implements OnInit {

  isPending: boolean = false;

  errorCode: number;

  newManager: Manager = null;  
  newPassword: string = null;
  newPasswordConfirm: string = null;

  constructor(
    private pendingService: PendingService,
    private mService: ManagerService
    ) { }

  ngOnInit() {
    
    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
  }

  isUsernameValid() {
    if(!this.newManager.username || this.newManager.username.length == 0)
      return false;
    
    return true;
    // TODO: implement some client-side validation
    // to give the user faster feed-back on input
  }

  isPasswordValid() {
    if(!this.newPassword || this.newPassword.length == 0)
      return false;

    return this.newPassword === this.newPasswordConfirm;
    // TODO: implement some client-side validation
    // to give the user faster feed-back on input
  }

  isEmailValid() {

    if(!this.newManager.email)
      return false;

    let email = this.newManager.email.toLowerCase();

    let result = email.match(`^[a-z0-9]+((\\-|\\.|_)?([a-z0-9]|\\d))*@[a-z0-9]+(\\.[a-z0-9]+)+$`)

    return Boolean(result && result.indexOf(email) > -1);
  }

  isPhoneValid() {
    if(!this.newManager.phone || this.newManager.phone.length == 0)
      return false;
    
    return true;
    // TODO: implement some client-side validation
    // to give the user faster feed-back on input
  }

  isNewManagerValid() {
    return this.isUsernameValid()
      && this.isPasswordValid()
      && this.isEmailValid()
      && this.isPhoneValid();
  }

  createNewManager() {
    this.errorCode = null;
    this.newManager = {
      id: 0,
      username: null,
      email: null,
      phone: null,
      userType: ""
    };
  }

  submitNewManager() {

    this.errorCode = null;
    
    this.mService.createManager(
      this.newManager,
      this.newPassword,
      (manager: Manager) => {
        this.newManager = null;
        this.newPassword = null;
      },
      (error: HttpErrorResponse) => {
        this.errorCode = error.status;
      }
    );
  }

  cancelNewManager() {
    this.newManager = null;
  }
}
