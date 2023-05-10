//Group Effort

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
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
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthGuard } from './auth.guard';



// import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
// import { environment } from 'src/environments/environment';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { FilterPipe } from './equipment-list/filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapPageComponent } from './map-page/map-page.component';
import { BestTimeComponent } from './best-time/best-time.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { BesttimeComponent } from './besttime/besttime.component';
import { TrafficReportComponent } from './traffic-report/traffic-report.component';


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
    ResetPasswordComponent,
    EquipmentListComponent,
    FilterPipe,
    DashboardComponent,
    MapPageComponent,
    CreateWorkoutComponent,
    BesttimeComponent,
    GoalsComponent,
    GoalFormComponent,
    TrafficReportComponent
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
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmNJOPD_kUBFJsEhOzjKWW0-gghB4otNA',
    })
  ],
  providers: [SignupComponent, EquipmentService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(){
  //   firebase.initializeApp(firebaseConfig);
  // }
 }
