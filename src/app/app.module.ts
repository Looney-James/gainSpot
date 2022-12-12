import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GymTrafficComponent } from './gym-traffic/gym-traffic.component';
import { CommunityComponent } from './community/community.component';
import { TrackerComponent } from './tracker/tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    GymTrafficComponent,
    CommunityComponent,
    TrackerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
