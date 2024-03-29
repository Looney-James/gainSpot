//Group effort

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MapPageComponent } from './map-page/map-page.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SecretComponent } from './secret/secret.component';
import { GymTrafficComponent } from './gym-traffic/gym-traffic.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { BesttimeComponent } from './besttime/besttime.component';

import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BestTimeComponent } from './best-time/best-time.component';
import { GoalsComponent } from './goals/goals.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'map', component: MapPageComponent, canActivate: [AuthGuard]},
  {path: 'weekly-schedule', component: WeeklyScheduleComponent, canActivate: [AuthGuard]},
  {path: 'createworkout', component: CreateWorkoutComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'secret', component: SecretComponent, canActivate: [AuthGuard]},
  {path: 'gym-traffic', component: GymTrafficComponent, canActivate: [AuthGuard]},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path: 'equipment-list', component: EquipmentListComponent, canActivate: [AuthGuard]},
  {path: 'password-reset', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'besttime', component: BesttimeComponent, canActivate: [AuthGuard]},
  {path: 'best-time', component: BestTimeComponent},
  {path: 'goals', component: GoalsComponent},
  {path: '**', component: PageNotFoundComponent},
  
  
];

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, AboutComponent, MapPageComponent, WeeklyScheduleComponent, CreateWorkoutComponent, SignupComponent, SecretComponent, GymTrafficComponent, EquipmentComponent, EquipmentListComponent, DashboardComponent, BestTimeComponent, GoalsComponent, BesttimeComponent]
