import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor(private dialogRef : MatDialog, private signupComponent: SignupComponent) { }

  ngOnInit(): void {
  }

  loginUser(event: Event) {
    event.preventDefault()
    console.log(event)
  }

  onLogin() {
    const isUserExist = this.signupComponent.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    if(isUserExist != undefined) {
      alert('Logged in');
    } else {
      alert('Login did not work')
    }
  }

}
