//Created by James Looney

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import type { IdTokenResult } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  async login(user: User): Promise<boolean> {

    try {
      const userCred = await this.auth.signInWithEmailAndPassword(user.email, user.password);
      const currentUser = userCred.user;
      if (currentUser) {
        
        const tokenResult = await currentUser.getIdTokenResult();
        const token = tokenResult?.token;
        localStorage.setItem('token', JSON.stringify(token));
        return true;
      } else {
        throw new Error('Current user is null or undefined');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
