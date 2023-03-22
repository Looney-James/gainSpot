// Made by Dustin Mader

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymDetailsComponent } from './gym-details.component';

const routes: Routes = [{ path: '', component: GymDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymDetailsRoutingModule { }
