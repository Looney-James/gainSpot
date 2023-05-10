//Created by James Looney

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import {Observable} from 'rxjs'
import { of } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$: Observable<string | null> = of(null);

  isLoggedIn: boolean =  true;

  constructor(private auth: AngularFireAuth, private router: Router) {
  }


  

  ngOnInit(): void {
    try {
      const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      this.user$ = of(user);
    }
  } catch (error) {
    console.error(error);
  }
  }

  
  logout() {
    this.auth.signOut().then(() => {
     
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
