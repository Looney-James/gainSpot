import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Workout{
  name: string;
  sets: string;
  reps: string;
  selected?: boolean;
  id?: string;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Observable<Workout[]>;
  // private workoutsCollection: AngularFirestoreCollection<Workout>;
  

  constructor(public dialog: MatDialog, private db: AngularFireDatabase) { 
      this.workouts = db.list<Workout>('workouts').snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => {
          const data = c.payload.val() as Workout;
          const id = c.payload.key;
          return {id: id ? id : undefined, ...data};
        });
      // this.db.list<Workout>('workouts').valueChanges().subscribe(workouts => {
      //   this.workouts = workouts;
    })
  );
}

  ngOnInit(): void {}

  
  openDialog(): void {
    const dialogRef = this.dialog.open(WorkoutFormComponent, {
      width: '300px',
      data: { name: '', sets: '', reps: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){

        // this.workoutsCollection.add(result);
        const workoutsCollection = this.db.list<Workout>('workouts');
      //  this.db.list<Workout>('workouts').push(result);
      workoutsCollection.push(result).then(ref =>{
        console.log('New workout key: ', ref.key);
      });
      }
    });
  }
  
  deleteWorkoutsSelected(): void {
    this.workouts.pipe(
      map(workouts => workouts.filter(workout => workout.selected))
    ).subscribe(deleteWorkouts => { 
      deleteWorkouts.forEach(workout => {
        this.db.list<Workout>('workouts').remove(workout.id).then(() => {
          console.log('Workout ${workout.id} deleted');
        }, (error) => {
          console.log('Error deleting workout ${workout.id}: ${error}');
        });
      })
    });
  }

  selectWorkout(workout: Workout): void{
    workout.selected = !workout.selected;
  }
}

