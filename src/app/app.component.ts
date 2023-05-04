import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'gainSpot';

  constructor(private dialogRef : MatDialog, private angularFireAuth: AngularFireAuth) {}

  isLoggedIn: boolean =  false;

  // Made by Dustin Mader
  // Displays the popup in the homepage.
  
  logout() {
    this.angularFireAuth.signOut().then(() => {
      window.alert('Logged Out!')
      this.isLoggedIn = false;
      localStorage.setItem("user", "")
    })
  }



  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}


