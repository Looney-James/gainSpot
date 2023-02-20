// Made By Dustin Mader

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupUsers: any[] = [];

  reactiveform!: FormGroup;
  constructor(private dialogRef : MatDialog, private formbuilder: FormBuilder) { 
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
    console.log('click')

    const userName: string = this.reactiveform?.controls['userName']?.value;
    const email: string = this.reactiveform?.controls['email']?.value;
    const password: string = this.reactiveform?.controls['confirmPassword']?.value;
    const signupUser = {
      userName, email, password
    }
    
    this.signupUsers.push(signupUser);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.reactiveform.reset();
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