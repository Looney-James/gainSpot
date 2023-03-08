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
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SecretComponent } from './secret/secret.component';
import { GymTrafficComponent } from './gym-traffic/gym-traffic.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EquipmentComponent } from './equipment/equipment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'map', component: MapPageComponent},
  {path: 'weekly-schedule', component: WeeklyScheduleComponent},
  {path: 'workouts', component: WorkoutListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'secret', component: SecretComponent},
  {path: 'gymtraffic', component: GymTrafficComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: 'gymtraffic/gym/:name', loadChildren: () => import('./gym-details/gym-details.module').then(m => m.GymDetailsModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, AboutComponent, MapPageComponent, WeeklyScheduleComponent, WorkoutListComponent, SignupComponent, SecretComponent, GymTrafficComponent, EquipmentComponent]
