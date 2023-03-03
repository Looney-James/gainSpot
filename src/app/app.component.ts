// import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  
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
  private dialogRef : MatDialog) {}
  // private angularFireAuth: AngularFireAuth

// ngOnInit(): void {
//   // this.angularFireAuth.authState.subscribe(user => {
//   //   this.isLoggedIn = !!user;
//   })
// }

// ngOnDestroy(): void {
//   throw new Error('Method not implemented.');
// }




 openLogout() {
  
 }

}
