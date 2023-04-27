import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth'
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {}

  isLoggedIn: boolean =  false;

  ngOnInit(): void {
  }

  
  logout() {
    this.angularFireAuth.signOut().then(() => {
     
      window.alert('Logged Out!')
      this.isLoggedIn = false;
      localStorage.setItem("user", "")
      window.location.href = '/'
    })
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
