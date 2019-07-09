import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  phone: number;
  firstname: string;
  lastname: string;

  
  constructor() { }

  ngOnInit() {
  }

  getUserProfile() {

  }

}
