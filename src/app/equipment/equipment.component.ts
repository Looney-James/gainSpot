import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  reportForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, public modalService: NgbModal, public snackbar: MatSnackBar) {
    this.reportForm = this.formBuilder.group({
      gym: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      comments: ['']
    });
  }

  submitReport() { 
    if (this.reportForm.valid) {
      const gym = this.reportForm.get('gym')?.value.replace(/\./g, '-');
      if (gym) {
        const equipment = this.reportForm.get('name')?.value;
        const status = this.reportForm.get('status')?.value;
        const comments = this.reportForm.get('comments')?.value;
        const date = new Date().toISOString();
        const report = { equipment, status, comments, date };
  
        this.db.list(`${gym}/reports`).push(report)
          .then(() => {
            console.log('Report submitted successfully');
            this.reportForm.reset();
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.panelClass = ['snackbar-color'];
            config.duration = 5000;
            this.snackbar.open('Report Submitted Successfully!', 'Close', config);
          })
          .catch((error) => {
            console.log('Error submitting report: ', error);
          });
      } else {
        console.log('Gym is required.');
      }
    }
  }  
}
