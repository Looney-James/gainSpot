import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http://localhost:4200/auth';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}

  login(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
}

