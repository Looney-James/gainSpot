// Made By Dustin Mader

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupUsers: any[] = [];

  reactiveform!: FormGroup;
  constructor(
    private dialogRef : MatDialog, 
    private formbuilder: FormBuilder, 
    private httpClient: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private snackBar: MatSnackBar) 
  { 
    this.reactiveform = this.formbuilder.group({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), this.passwordValidator()])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6) , this.passwordValidator()]))
    })
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
    this.reactiveform.valueChanges.subscribe(val =>{
      console.log(this.reactiveform.controls["userName"].value);
    }) 
  }

  signupUser(event: Event) {
    event.preventDefault()
    console.log(event)
  }

  onSignup() {
    // Test it is working
    console.log(this.reactiveform.value);

    const userName: string = this.reactiveform?.controls['userName']?.value;
    const email: string = this.reactiveform?.controls['email']?.value;
    const confirmPassword: string = this.reactiveform?.controls['confirmPassword']?.value;
    const signupUser = {
      userName, email, confirmPassword
    }
    
    this.signupUsers.push(signupUser);
    // Stores data locally in the application
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    // Directly sends information to backend database.
    this.httpClient.post('https://gainspot-3cbad-default-rtdb.firebaseio.com/users.json', this.reactiveform.value).subscribe();
    // Store user information and authenticates user in firebase.
    this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, 
      { ...this.reactiveform.value, returnSecureToken: true}
    )
    .subscribe(
      (response) => {
          console.log('response', response);
          this.reactiveform.reset();

          this.snackBar.open("Account successfully created!", "Done",{
            duration: 6000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ['purple-snackbar']
          })

          // this.router.navigate(['/']);
          this.router.navigate(['/../', 'login'], {relativeTo: this.activatedRoute});
        }, 
        (error) => {
          let authFailMessage = "Signup was unsuccessful. Please try again.    " + error.error.error.message;

          this.snackBar.open(authFailMessage, "Done",{
            duration: 6000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ['purple-snackbar']
          })
        }
      );
  }

  passwordValidator() : ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any} | null =>
    {
      const password1: string = this.reactiveform?.controls['password']?.value;
      const confirmPassword: string = this.reactiveform?.controls['confirmPassword']?.value;
      if(password1 !== confirmPassword){
        return { passwordmismatch : true }
      }
      return null;
    }
  }
}