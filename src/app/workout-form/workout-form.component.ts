import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


export interface Workout{
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {

  formIsValid!: boolean;
  workoutReport: FormGroup;

  @Output() addWorkout = new EventEmitter<Workout>();

  constructor(public dialogRef: MatDialogRef<WorkoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private firestore: AngularFirestore){

      this.workoutReport = this.formBuilder.group({
        name: ['', Validators.required],
        sets: ['', Validators.required],
        reps: ['', Validators.required],
        weight: ['', Validators.required]
      });
     }

     isFormValid(): boolean {
      return this.data.name && this.data.sets && this.data.reps && this.data.weight;
    }
    
    

    onNoClick(): void{
      this.dialogRef.close();
    }

    onAddClick(): void {
      if (!this.formIsValid) {
        return;
      }
    
      const workout: Workout = this.workoutReport.value;
    
      this.firestore.collection('workouts').add(workout).then(() => {
        console.log('Workout added successfully');
      }).catch((error) => {
        console.error('Error adding workout: ', error);
      });
    
      this.dialogRef.close();
    }
    
}
