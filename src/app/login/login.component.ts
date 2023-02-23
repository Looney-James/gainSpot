// Made By Dustin Mader

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private dialogRef : MatDialog, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }

  // loginUser(event: Event) {
  //   event.preventDefault()
  //   console.log(event)
  // }

  onLogin(loginForm: NgForm) {

    console.log(loginForm.value);

    const url = 'https://gainspot-3cbad-default-rtdb.firebaseio.com/users.json';

    // Retrieves data by checking for username in the database
    this.httpClient.get(url, {params: new HttpParams()
      .set('orderBy', '"userName"')
      .set('equalTo', `"${loginForm.value.userName}"`),
    })
    // Will allow the user to go to the homepage if the login information matches what is in the database.
    // Still needs to check for password and have better authentication.
    .subscribe((user) => {
      if(Object.keys(user)?.length > 0) {
        this.router.navigate(['']);
        console.log(user);
      }
    });

    // const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    // if(isUserExist != undefined) {
    //   alert('Logged in');
    // } else {
    //   alert('Login did not work')
    // }
  }

}
