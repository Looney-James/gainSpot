// Made By Dustin Mader

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupUsers: any[] = [];
  signupObj: any = {
      userName: '',
      email: '',
      newPassword: '',
      confirmPassword: ''
  };
  
  // signupUserForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('')
  // })

  // get email(){return this.signupUserForm.get('email')}

  // reactiveform!: FormGroup;
  constructor(private dialogRef : MatDialog) { 
    // this.reactiveform = this.formbuilder.group({
    //   userName: new FormControl(),
    //   newPassword: new FormControl(),
    //   confirmPassword: new FormControl()
    // })
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
    // this.signupUserForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('')
    // })
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
    console.warn(this.signupObj.value);
  }
}