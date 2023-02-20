import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymDetailsRoutingModule } from './gym-details-routing.module';
import { GymDetailsComponent } from './gym-details.component';


@NgModule({
  declarations: [
    GymDetailsComponent
  ],
  imports: [
    CommonModule,
    GymDetailsRoutingModule
  ]
})
export class GymDetailsModule { }
