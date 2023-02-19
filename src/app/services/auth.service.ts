import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';

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

// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// import { AppComponent } from './app.component';
// import { LandingComponent } from './components/landing/landing.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { LogInComponent } from './components/log-in/log-in.component';
// import { AuthService } from './services/auth.service';


// @NgModule({
//   declarations: [
//     AppComponent,
//     LandingComponent,
//     SignUpComponent,
//     LogInComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     HttpClientModule,
//     RouterModule.forRoot([
//       { path: 'log-in', component: LogInComponent },
//       { path: 'sign-up', component: SignUpComponent },
//       { path: '', component: LandingComponent },
//       { path: '**', redirectTo: '/' }
//     ])
//   ],
//   providers: [AuthService],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }