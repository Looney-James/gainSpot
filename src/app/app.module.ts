import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpBackend } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, Validators } from '@angular/forms';
import { SecretComponent } from './secret/secret.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { GymTrafficComponent } from './gym-traffic/gym-traffic.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    GetstartedComponent,
    HomeComponent,
    SignupComponent,
    SecretComponent,
    GymTrafficComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatListModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [SignupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
