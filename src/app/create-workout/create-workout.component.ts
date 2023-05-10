// Created by James Looney
import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Workout{
  name: string;
  sets: string;
  reps: string;
  weight: string;
  userId: string;
  completed: boolean;
  id?: string;

}

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {
  workoutsCollection!: AngularFirestoreCollection<Workout>;
  completedWorkoutsCollection!: AngularFirestoreCollection<Workout>;
  workouts!: Observable<Workout[]>;
  completedWorkouts!: Observable<Workout[]>;
  uid!: string;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private auth: AngularFireAuth, private snackBar: MatSnackBar) { 
    this.auth.user.subscribe(user => {

      if(user){
      this.uid = user.uid ?? '';
      this.workoutsCollection = this.firestore.collection<Workout>('workouts', ref => ref.where('userId', '==', this.uid));
      this.completedWorkoutsCollection = this.firestore.collection<Workout>('completedWorkouts');
      this.workouts = this.workoutsCollection.valueChanges({idField: 'id'});
      }
      if(user){
        this.uid = user.uid ?? '';
        this.completedWorkoutsCollection = this.firestore.collection<Workout>('completedWorkouts', ref => ref.where('userId', '==', this.uid));
        this.workoutsCollection = this.firestore.collection<Workout>('workouts');
        this.completedWorkouts = this.completedWorkoutsCollection.valueChanges({idField: 'id'});
        }
    });
     
  }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  openDialog(): void {

    console.log('openDialog called');
    const dialogRef = this.dialog.open(WorkoutFormComponent, {
      width: '300px',
      data: { name: '', sets: '', reps: '', weight: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        result.userId = this.uid;
        this.workoutsCollection.add(result).then(ref =>{
          console.log('New workout key: ', ref.id);
        });
      }
    });
  }

  onComplete(workout: Workout) {
    if (workout.completed) {
      this.workoutsCollection.doc(workout.id).delete();
      this.completedWorkoutsCollection.add(workout);
      this.snackBar.open('Workout completed!', 'Close',{
        duration: 5000,
        verticalPosition: 'top',
        panelClass: 'snackbar-success'
      })
    }
  }

  unComplete(workout: Workout) {
    if (!workout.completed) {
      this.completedWorkoutsCollection.doc(workout.id).delete();
      this.workoutsCollection.add(workout);
      this.snackBar.open('Workout uncompleted!', 'Close',{
        duration: 5000,
        verticalPosition: 'top',
        panelClass: 'snackbar-success'
      })
    }
  }
  
}