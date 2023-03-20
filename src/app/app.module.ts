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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentService } from './equipment/equipment.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProfileComponent } from './profile/profile.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCP8fm5Ov1LFzMO1Pw8kNyeOctL9nU1onI",
  authDomain: "gainspot-3cbad.firebaseapp.com",
  databaseURL: "https://gainspot-3cbad-default-rtdb.firebaseio.com",
  projectId: "gainspot-3cbad",
  storageBucket: "gainspot-3cbad.appspot.com",
  messagingSenderId: "985128281237",
  appId: "1:985128281237:web:0dde6ed3ef30b54685e79c",
  measurementId: "G-D3ZEYWJ1EZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
    PageNotFoundComponent,
    EquipmentComponent,
    WorkoutFormComponent,
    ProfileComponent
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [SignupComponent, EquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
