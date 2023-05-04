import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';



export interface Workout{
  name: string;
  sets: string;
  reps: string;
  weight: string;
  userId: string;
}

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {
  workoutsCollection: AngularFirestoreCollection<Workout>;
  workouts: Observable<Workout[]>;
  uid = '';

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private auth: AngularFireAuth) { 
      this.workoutsCollection = this.firestore.collection<Workout>('workouts');
      this.workouts = this.workoutsCollection.valueChanges({idField: 'id'});
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
      data: { name: '', sets: '', reps: ''}
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
}