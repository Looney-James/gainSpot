import { Component, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Report {
  id: string;
  gym: string;
  equipment: string;
  status: string;
  comments: string;
  date: Date;
}

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})

export class EquipmentListComponent {
  selectedGym!: string;
  gyms = [  
    'E.L. Wiegand Fitness Center',    
    'Anytime Fitness',    
    'South Reno Athletic Club',    
    'Double Edge Fitness - Midtown',    
    'American Iron Gym',  
  ];

  reports$!: Observable<any[]>;
  searchTerm!: string;
  selectedDate!: string;
  selectedStatus!: string;
  reportLimit = 1000;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  ngOnInit() {
    this.selectedGym = this.gyms[0];
    this.selectedDate = '';
    this.selectedStatus = '';
    this.updateReports();
  }

  updateReports() {
    let queryFn: any = null;

    if (this.selectedDate === 'asc') {
      queryFn = (ref: any) => ref.orderByChild('date');
    } else if (this.selectedDate === 'desc') {
      queryFn = (ref: any) => ref.orderByChild('date').limitToLast(this.reportLimit);
    }

    const reportsRef = this.db.list<Report>(`${this.selectedGym.replace(/\./g, '-')}/reports`, queryFn);

    this.reports$ = reportsRef.snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          key: c.payload.key,
          ...(c.payload.val() as Report)
        })).reverse()
      )
    );
  }
  
  onChangeGym() {
    this.updateReports();
  }

  onChangeDate() {
    this.updateReports();
  }

  onChangeStatus(selectedStatus: string) {
    if (selectedStatus !== this.selectedStatus) {
      this.selectedStatus = status;
      this.updateReports();
    }
  }
  
  get filteredReports$(): Observable<Report[]> {
    return combineLatest([this.reports$, of(this.selectedStatus), of(this.searchTerm)]).pipe(
      map(([reports, status, searchTerm]) => {
        return reports.filter(report => {
          return (
            report.equipment.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!status || report.status === status)
          );
        });
      })
    );
  }
  
  getBadgeColor(status: string) {
    switch (status) {
      case 'working':
        return 'badge-success';
      case 'broken':
        return 'badge-danger';
      case 'needs maintenance':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }

  openFileWindow(event: MouseEvent) {
    const url = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (url) {
      const width = 600;
      const height = 800;
      const left = screen.width / 2 - width / 2;
      const top = screen.height / 2 - height / 2;
      const fileWindow = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top},toolbar=0,location=0,menubar=0`);
      if (fileWindow) {
        setTimeout(() => {
          fileWindow.close();
        }, 10000);
      }
    }
  }  
}
