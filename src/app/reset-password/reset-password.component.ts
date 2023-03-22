import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  onResetPasswordForm(resetForm: NgForm) {
    this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebase.apiKey}`, 
      { ...resetForm.value, requestType: 'PASSWORD_RESET'}
    )
    .subscribe(
      () => {

          this.snackBar.open("Email has been sent!", "Done",{
            duration: 6000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ['purple-snackbar']
          })

          this.router.navigate(['/login']);

          // firebase.database()
        }, 
        (error) => {
          let authFailMessage = "The email was not sent.    " + error.error.error.message;

          this.snackBar.open(authFailMessage, "Done",{
            duration: 6000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ['purple-snackbar']
          })
        });
  }

}