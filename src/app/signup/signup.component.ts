import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupUsers: any[] = [];
  signupObj: any = {
      userName: '',
      email: '',
      newPassword: '',
      confirmPassword: ''
  };

  constructor(private dialogRef : MatDialog) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  signupUser(event: Event) {
    event.preventDefault()
    console.log(event)
  }

  onSignup() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}