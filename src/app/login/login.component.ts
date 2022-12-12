import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialogRef : MatDialog) { }

  ngOnInit(): void {
  }

  loginUser(event: Event) {
    event.preventDefault()
    console.log(event)
  }

  closeLogin() {
    this.dialogRef.closeAll();
  }

}
