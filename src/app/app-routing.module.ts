import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CommunityComponent } from './community/community.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'community', component: CommunityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
export const routingComponents = [LoginComponent, AboutComponent, CommunityComponent]
