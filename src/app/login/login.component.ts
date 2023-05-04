// Made By Dustin Mader
// Very small edits done by James

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { coerceStringArray } from '@angular/cdk/coercion';

// import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore' 
// import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(
    private dialogRef: MatDialog,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {

    const user = new User();
    user.email = loginForm.value.email;
    user.password = loginForm.value.password;

    this.authService.login(user).then(result => {
      if (result) {
        this.snackBar.open('Successfully Logged In!', 'Done', {
          duration: 6000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['purple-snackbar']
        });
        localStorage.setItem('user', JSON.stringify(user.email));
        this.router.navigate(['dashboard']);
        loginForm.resetForm();
      } else {
        const authFailMessage = 'Login did not work.';
        this.snackBar.open(authFailMessage, 'Done', {
          duration: 6000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['purple-snackbar']
        });
      }
    });
  }
}