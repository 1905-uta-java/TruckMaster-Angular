import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';

@Component({
  selector: 'app-driver-homepage',
  templateUrl: './driver-homepage.component.html',
  styleUrls: ['./driver-homepage.component.css']
})
export class DriverHomepageComponent implements OnInit {
  isPending: boolean = false;

  constructor(private pendingService: PendingService) { }

  ngOnInit() {
    
    this.pendingService.pendingEvent.subscribe((value) => {
      setTimeout(() => {
        this.isPending = value;
      });
    });
  }
}
