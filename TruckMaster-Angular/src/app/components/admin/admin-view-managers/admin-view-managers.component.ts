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
    if(!this.newManager.username)
      return false;
    
    if(this.newManager.username.length < 6 || this.newManager.username.length > 32)
      return false;

    let copy = this.newManager.username.toLowerCase();

    let result = copy.match("^([0-9a-z]|_)*$");
    
    return Boolean(result && result.indexOf(copy) > -1);
  }

  isPasswordValid() {
    if(!this.newPassword)
      return false;
    
    if(this.newPassword.length < 6 || this.newPassword.length > 32)
      return false;
    
    let copy = this.newPassword.toLowerCase();

    let result = copy.match("^([a-z0-9]|_|!|\\.|\\?)*$");
    
    return (this.newPassword === this.newPasswordConfirm) && Boolean(result && result.indexOf(copy) > -1);
  }

  isEmailValid() {

    if(!this.newManager.email)
      return false;

    let email = this.newManager.email.toLowerCase();

    let result = email.match(`^[a-z0-9]+((\\-|\\.|_)?([a-z0-9]|\\d))*@[a-z0-9][a-z0-9]+(\\.[a-z0-9][a-z0-9]+)+$`)

    return Boolean(result && result.indexOf(email) > -1);
  }

  isPhoneValid() {
    if(!this.newManager.phone)
      return false;
    
    let result = this.newManager.phone.match(`((\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})`);

    return Boolean(result && result.indexOf(this.newManager.phone) > -1)
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
