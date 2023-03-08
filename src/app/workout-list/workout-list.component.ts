import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

export interface Workout{
  name: string;
  sets: string;
  reps: string;
  selected?: boolean;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}
  
  openDialog(): void {
    const dialogRef = this.dialog.open(WorkoutFormComponent, {
      width: '700px',
      data: { name: '', sets: '', reps: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.workouts.push(result);
      }
    });
  }
  
  deleteWorkoutsSelected(): void {
    this.workouts = this.workouts.filter(workout => !workout.selected);
  }
}

