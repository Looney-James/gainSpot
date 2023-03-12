import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  title = 'gainSpot';

  constructor(private dialogRef : MatDialog) {}

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

  openLogin(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '84px',
    };
    dialogConfig.width = '600px';
    dialogConfig.height = '300px';

    this.dialogRef.open(LoginComponent, dialogConfig);
  }

  
}
