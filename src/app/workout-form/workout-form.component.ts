import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface Workout{
  name: string;
  sets: string;
  reps: string;
}

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {

  @Output() addWorkout = new EventEmitter<Workout>();

  constructor(public dialogRef: MatDialogRef<WorkoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void{
      this.dialogRef.close();
    }

    onAddClick(): void{
      this.addWorkout.emit(this.data);
      this.dialogRef.close();
    }
}
