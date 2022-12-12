import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { GymTrafficComponent } from './gym-traffic/gym-traffic.component';
import { CommunityComponent } from './community/community.component';
import { TrackerComponent } from './tracker/tracker.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'gymTraffic', component: GymTrafficComponent},
  {path: 'community', component: CommunityComponent},
  {path: 'tracker', component: TrackerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
export const routingComponents = [LoginComponent, AboutComponent]
