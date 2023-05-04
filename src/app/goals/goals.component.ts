import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoalFormComponent } from '../goal-form/goal-form.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface Goal {
  goalName: string;
  priority: string;
  comments: string;
  deadline: string;
  userId: string;
}

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goalsCollection!: AngularFirestoreCollection<Goal>;
  goals!: Observable<Goal[]>;
  uid!: string;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      
      if (user){
        this.uid = user.uid ?? '';
        this.goalsCollection = this.firestore.collection<Goal>('goals', ref => ref.where('userId', '==', this.uid));
        this.goals = this.goalsCollection.valueChanges({idField: 'id'});
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
    const dialogRef = this.dialog.open(GoalFormComponent, {
      width: '300px',
      data: {goalName: '', priority: '', comments: '', deadline: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        result.userId = this.uid;
        this.goalsCollection.add(result).then(ref =>{
          console.log('New goal key: ', ref.id);
        });
      }
    });
  }

  getBadgeColor(priority: string) {
    switch (priority) {
      case 'low':
        return 'badge-success';
      case 'high':
        return 'badge-danger';
      case 'mid':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

}
