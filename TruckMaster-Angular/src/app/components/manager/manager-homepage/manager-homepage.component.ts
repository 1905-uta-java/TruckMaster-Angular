import { Component, OnInit } from '@angular/core';
import { PendingService } from 'src/app/services/pending.service';

@Component({
  selector: 'app-manager-homepage',
  templateUrl: './manager-homepage.component.html',
  styleUrls: ['./manager-homepage.component.css']
})
export class ManagerHomepageComponent implements OnInit {
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
