// Created by Gerard Bensadoun Gutsens

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrafficReportComponent } from '../traffic-report/traffic-report.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface Traffic {
  gym: string;
  weekday: string;
  time: string;
  busyness: string;
  id?: string;
}

@Component({
  selector: 'app-gym-traffic',
  templateUrl: './gym-traffic.component.html',
  styleUrls: ['./gym-traffic.component.css']
})
export class GymTrafficComponent implements OnInit {
  trafficCollection!: AngularFirestoreCollection<Traffic>;
  traffics!: Observable<Traffic[]>;
  uid!: string;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private auth: AngularFireAuth, private snackBar: MatSnackBar, private db: AngularFireDatabase) {
    this.auth.user.subscribe(user => {
      
      if (user){
        this.uid = user.uid ?? '';
        this.trafficCollection = this.firestore.collection<Traffic>('traffic');
        this.traffics = this.trafficCollection.valueChanges({idField: 'id'});
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
    const dialogRef = this.dialog.open(TrafficReportComponent, {
      width: '300px',
      data: {gym : '', weekday: '', time: '', busyness: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        result.userId = this.uid;
        this.trafficCollection.add(result).then(ref =>{
          console.log('New traffic key: ', ref.id);
        });
      }
    });
  }

  getBadgeColor(busyness: string) {
    switch (busyness) {
      case 'not busy':
        return 'badge-success';
      case 'busy':
        return 'badge-danger';
      case 'average':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

}
