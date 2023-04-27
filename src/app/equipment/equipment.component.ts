import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

interface Report {
  equipment: string;
  status: string;
  comments: string;
  date: string;
  fileUrl?: string;
}

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  reportForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private storage: AngularFireStorage, public modalService: NgbModal, public snackbar: MatSnackBar) {
    this.reportForm = this.formBuilder.group({
      gym: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      comments: [''],
      file: [null, Validators.pattern(/(\.jpg|\.jpeg|\.png)$/i)]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/.jpg', 'image/.jpeg', 'image/.png'];
      if (validImageTypes.includes(fileType)) {
        this.selectedFile = file;
      }
    }
  }  

  submitReport() {
    if (this.reportForm.valid) {
      const gym = this.reportForm.get('gym')?.value.replace(/\./g, '-');
      if (gym) {
        const equipment = this.reportForm.get('name')?.value;
        const status = this.reportForm.get('status')?.value;
        const comments = this.reportForm.get('comments')?.value;
        const date = new Date().toISOString();
        const report: Report = { equipment, status, comments, date };
    
        if (this.selectedFile) {
          const filePath = `${gym}/reports/${this.selectedFile.name}`;
          const fileRef = this.storage.ref(filePath);
          const uploadTask = this.storage.upload(filePath, this.selectedFile);
          uploadTask.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                report.fileUrl = url;
                this.submitReportData(gym, report);
              });
            })
          ).subscribe();
        } else {
          this.submitReportData(gym, report);
        }
      } else {
        console.log('Gym is required.');
      }
    }
  }

  submitReportData(gym: string, report: Report) {
    this.db.list(`${gym}/reports`).push(report)
      .then(() => {
        console.log('Report submitted successfully');
        this.reportForm.reset();
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.panelClass = ['purple-snackbar'];
        config.duration = 5000;
        this.snackbar.open('Report Submitted Successfully!', 'Close', config);
      })
      .catch((error) => {
        console.log('Error submitting report: ', error);
      });
  }
}
