// Created by Gerard Bensadoun Gutsens
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


export interface Goal{
  goalName: string;
  priority: string;
  comments: string;
  deadline: string;
}

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css']
})
export class GoalFormComponent {

  formIsValid!: boolean;
  goalReport: FormGroup;

  @Output() addGoal = new EventEmitter<Goal>();

  constructor(public dialogRef: MatDialogRef<GoalFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.goalReport = this.formBuilder.group({
      goalName: ['', Validators.required],
      priority: ['', Validators.required],
      comments: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  isFormValid(): boolean {
    return this.data.goalName && this.data.priority && this.data.comments && this.data.deadline;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (!this.formIsValid) {
      return;
    }
  
    const goal: Goal = this.goalReport.value;

    this.firestore.collection('goals').add(goal).then(() => {
      console.log('Goal set successfully');
    }).catch((error) => {
      console.error('Error setting goal: ', error);
    });

    this.dialogRef.close();
  }
}
