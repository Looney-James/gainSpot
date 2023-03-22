import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'gainSpot';

  constructor(private dialogRef : MatDialog) {}

  isLoggedIn: boolean =  false;

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

  // ngOnInit(): void{
  //   console.log(localStorage.getItem("user"));
  //   this.isLoggedIn = true;
  // }

  // logout() {
  //   this.angularFireAuth.signOut().then(() => {
  //     window.alert('Logged Out!')
  //     this.isLoggedIn = false;
  //     localStorage.setItem("user", "")
  //   })
  // }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  // Most likely won't be needed as I reimplemented the login popup to a different page
  // openLogin(){
  //   const dialogConfig = new MatDialogConfig();
  //   //dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.position = {
  //     'top': '84px',
  //   };
  //   dialogConfig.width = '600px';
  //   dialogConfig.height = '300px';

  //   this.dialogRef.open(LoginComponent, dialogConfig);
  // }

}
