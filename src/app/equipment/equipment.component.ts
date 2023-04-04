import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  @ViewChild('successModal') successModal: any;

  showSuccessMessage = false;
  reportForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, public modalService: NgbModal) {
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
            this.showSuccessMessage = true; // Set the flag to true
            setTimeout(() => this.showSuccessMessage = false, 5000); // Hide the message after 5 seconds
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
