//Created by Matthew Tang

import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { filter } from 'rxjs';

interface Report {
  equipment: string;
  status: string;
  comments: string;
  date: string;
  fileUrl?: string;
  user?: string;
}

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  reportForm: FormGroup;
  selectedFile: File | null = null;
  user$: Observable<string | null> =of(null);
  isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private storage: AngularFireStorage, private auth: AngularFireAuth, public modalService: NgbModal, public snackbar: MatSnackBar) {
    this.reportForm = this.formBuilder.group({
      gym: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      comments: [''],
      file: [null, Validators.pattern(/(\.jpg|\.jpeg|\.png)$/i)]
    });

    this.auth.authState.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.user$ = of(user.email?.split('@')[0] || '');
      } else {
        this.isLoggedIn = false;
        this.user$ = of('');
      }
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
    this.selectedFile = file;
  }  

  submitReport() {
    if (this.reportForm.valid) {
      const gym = this.reportForm.get('gym')?.value.replace(/\./g, '-');
      if (gym) {
        const equipment = this.reportForm.get('name')?.value;
        const status = this.reportForm.get('status')?.value;
        const comments = this.reportForm.get('comments')?.value;
        const date = new Date().toISOString();
        
        this.user$.pipe(
          filter((val): val is string => val !== undefined && val !== null),
          switchMap(user => {
            const report: Report = { equipment, status, comments, date, user };
            if (this.selectedFile) {
              const filePath = `${gym}/reports/${this.selectedFile.name}`;
              const fileRef = this.storage.ref(filePath);
              const uploadTask = this.storage.upload(filePath, this.selectedFile);
              return uploadTask.snapshotChanges().pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe(url => {
                    if (url) {
                      report.fileUrl = url;
                      this.submitReportData(gym, report);
                    } else {
                      console.error('Error getting file URL.');
                    }
                  }, error => {
                    console.error(error);
                  });
                })
              );
            } else {
              this.submitReportData(gym, report);
              return of(null);
            }
          })
        ).subscribe();
        
      } else {
        console.log('Gym is required.');
      }
    } else {
      console.error('Report form is not valid.');
    }
  }
  
  submitReportData(gym: string, report: Report) {
    this.user$.subscribe((user) => {
      report.user = user ?? '';
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
    });
  }
  
}
