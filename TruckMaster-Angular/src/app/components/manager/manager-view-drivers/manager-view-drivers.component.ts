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
  errorCode: number = null;

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
    this.errorCode = null;

    if(!this.cache.drivers || this.cache.drivers.length === 0) {

      this.dService.getDriversForManager(
        this.cache.authedUser.id,
        (drivers: Driver[]) => {
          this.cache.drivers = drivers;
        },
        (error: HttpErrorResponse) => {
          this.errorCode = error.status;
        }
      )
    }
  }
}
