import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, AboutComponent]
