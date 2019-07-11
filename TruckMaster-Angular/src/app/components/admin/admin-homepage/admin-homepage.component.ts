import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

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
