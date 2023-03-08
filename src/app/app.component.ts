// import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

export class AppComponent implements OnInit, OnDestroy{
  
  title = 'gainSpot';

  // Made by Dustin Mader
  // Displays the popup in the homepage.
  openAbout(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '84px',
    };
    dialogConfig.width = '600px';
    dialogConfig.height = '300px';

    this.dialogRef.open(AboutComponent, dialogConfig);
  }

 isLoggedIn: boolean = false;

 constructor(
  private dialogRef : MatDialog,
  private angularFireAuth : AngularFireAuth) {}

  ngOnInit(): void {
    // const auth = getAuth();
    // const user = auth.currentUser;

    // const user = this.angularFireAuth.authState.subscribe();
    // console.log(user);

    // this.angularFireAuth.authState.subscribe(user => {
    //   if (user) {
    //   console.log(user);
    //   this.isLoggedIn = !!user;
    //   } else {
    //     console.log("error");
    //   }
    // })

    console.log(localStorage.getItem("user"));
    this.isLoggedIn = true;
  }

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
