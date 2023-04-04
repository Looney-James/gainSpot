import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterPipe } from './filter.pipe';

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
  gyms = [  'E.L. Wiegand Fitness Center',    
            'Anytime Fitness',    
            'South Reno Athletic Club',    
            'Double Edge Fitness - Midtown',    
            'American Iron Gym',  ];
  reports$!: Observable<any[]>;
  searchTerm!: string;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.selectedGym = this.gyms[0];
    this.updateReports();
  }

  updateReports() {
    this.reports$ = this.db
      .list(`${this.selectedGym.replace(/\./g, '-')}/reports`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val() as object,
          }))
        )
      );
  }

  onChangeGym() {
    this.updateReports();
  }

  get filteredReports$(): Observable<Report[]> {
    return this.reports$.pipe(
      map(reports => reports.filter(report => report.equipment.toLowerCase().includes(this.searchTerm.toLowerCase())))
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
}



