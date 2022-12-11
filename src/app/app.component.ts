import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gainSpot';

  constructor(private dialogRef : MatDialog) {}

  openAbout(){
    this.dialogRef.open(AboutComponent);
  }

  openLogin(){
    this.dialogRef.open(LoginComponent);
  }

}
