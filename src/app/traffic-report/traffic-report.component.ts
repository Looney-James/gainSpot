// Created by Gerard Bensadoun Gutsens
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


export interface Traffic{
  gym: string;
  weekday: string;
  time: string;
  busyness: string;
}

@Component({
  selector: 'app-traffic-report',
  templateUrl: './traffic-report.component.html',
  styleUrls: ['./traffic-report.component.css']
})
export class TrafficReportComponent {

  formIsValid!: boolean;
  trafficReport: FormGroup;

  @Output() addTraffic = new EventEmitter<Traffic>();

  constructor(public dialogRef: MatDialogRef<TrafficReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.trafficReport = this.formBuilder.group({
      gym: ['', Validators.required],
      weekday: ['', Validators.required],
      time: ['', Validators.required],
      busyness: ['', Validators.required]
    });
  }

  isFormValid(): boolean {
    return this .data.gym && this.data.weekday && this.data.time && this.data.busyness;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (!this.formIsValid) {
      return;
    }
  
    const traffic: Traffic = this.trafficReport.value;

    this.firestore.collection('traffic').add(traffic).then(() => {
      console.log('Traffic reported successfully');
    }).catch((error) => {
      console.error('Error reporting traffic: ', error);
    });

    this.dialogRef.close();
  }
}
