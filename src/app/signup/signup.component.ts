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
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupUsers: any[] = [];

  reactiveform!: FormGroup;
  constructor(private dialogRef : MatDialog, private formbuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.reactiveform = this.formbuilder.group({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      newPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), this.passwordValidator()])),
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
    const password: string = this.reactiveform?.controls['confirmPassword']?.value;
    const signupUser = {
      userName, email, password
    }
    
    this.signupUsers.push(signupUser);
    // Stores data locally in the application
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    // Directly sends information to backend database.
    // Store user information in firebase. Could try using "this.signupUsers" to match the values with login if needed.
    this.httpClient.post("https://gainspot-3cbad-default-rtdb.firebaseio.com/users.json", this.reactiveform.value)
    .subscribe(
      (response) => {
          console.log(response);
          this.reactiveform.reset();
          (<any>this.router).navigate(['/../', 'login'], {relativeTo: this.activatedRoute});
        }, 
        (error) => {
          console.log(error);
        }
      );
  }

  passwordValidator() : ValidatorFn {
    return (control: AbstractControl) : { [key: string]: any} | null =>
    {
      const password1: string = this.reactiveform?.controls['newPassword']?.value;
      const confirmPassword: string = this.reactiveform?.controls['confirmPassword']?.value;
      if(password1 !== confirmPassword){
        return { passwordmismatch : true }
      }
      return null;
    }
  }
}