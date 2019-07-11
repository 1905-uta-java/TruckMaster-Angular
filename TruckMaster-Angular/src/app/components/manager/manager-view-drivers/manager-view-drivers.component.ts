import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';
import { CacheService } from 'src/app/services/cache.service';
import { DriverService } from 'src/app/services/driver.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Driver } from 'src/app/models/Driver';

@Component({
  selector: 'app-manager-view-drivers',
  templateUrl: './manager-view-drivers.component.html',
  styleUrls: ['./manager-view-drivers.component.css']
})
export class ManagerViewDriversComponent implements OnInit {

  isPending: boolean = false;
  errorMessage: string = null;

  newDriver: Driver = null;
  newPassword: string = null;
  newPasswordConfirm: string = null;

  constructor(
    private pendingService: PendingService,
    private cache: CacheService,
    private dService: DriverService
  ) { }
  
  ngOnInit() {

    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
    
    this.getDrivers();
  }

  getDrivers() {

    this.errorMessage = null;

    if(!this.cache.drivers || this.cache.drivers.length === 0) {

      this.dService.getDriversForManager(
        this.cache.authedUser.id,
        (drivers: Driver[]) => {
          this.cache.drivers = drivers;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      )
    }
  }

  isUsernameValid() {
    if(!this.newDriver.username)
      return false;
    
    if(this.newDriver.username.length < 6 || this.newDriver.username.length > 32)
      return false;
    
    let copy = this.newDriver.username.toLowerCase();

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

    if(!this.newDriver.email)
      return false;

    let email = this.newDriver.email.toLowerCase();

    let result = email.match(`^[a-z0-9]+((\\-|\\.|_)?([a-z0-9]|\\d))*@[a-z0-9][a-z0-9]+(\\.[a-z0-9][a-z0-9]+)+$`)

    return Boolean(result && result.indexOf(email) > -1);
  }

  isPhoneValid() {
    
    if(!this.newDriver.phone)
      return false;
    
    let result = this.newDriver.phone.match(`((\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}|[0-9]{10})`);

    return Boolean(result && result.indexOf(this.newDriver.phone) > -1)
  }

  isNewDriverValid() {
    return this.isUsernameValid()
      && this.isPasswordValid()
      && this.isEmailValid()
      && this.isPhoneValid();
  }

  createNewDriver() {

    this.errorMessage = null;

    this.newDriver = {
      id: 0,
      username: "",
      email: "",
      phone: "",
      userType: ""
    };
  }

  submitNewDriver() {
    
    this.errorMessage = null;

    this.dService.addDriver(
      this.newDriver,
      this.newPassword,
      (driver: Driver) => {
        this.newDriver = null;
        this.newPassword = null;

        this.getDrivers();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    )
  }

  cancelNewDriver() {
    this.errorMessage = null;
    this.newDriver = null;
    this.newPassword = null;
  }
}
