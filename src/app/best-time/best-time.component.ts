import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { response } from 'express';

@Component({
  selector: 'app-best-time',
  template: `
  <h2>Foot Traffic Data</h2>
    <ng-container *ngIf="predictions.length; else noData">
      <table>
        <thead>
          <tr>
            <th>Day of Week</th>
            <th>Hour of Day</th>
            <th>Peak Likelihood</th>
            <th>Estimated Wait Time</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let prediction of predictions">
            <td>{{ prediction.dayOfWeek }}</td>
            <td>{{ prediction.hourOfDay }}</td>
            <td>{{ prediction.peakLikelihood }}</td>
            <td>{{ prediction.estimatedWaitTime }}</td>
          </tr>
        </tbody>
      </table>
    </ng-container>
    <ng-template #noData>
      <p>No foot traffic data available.</p>
    </ng-template>
  `,
    
})
export class BestTimeComponent implements OnInit {

  predictions: any[] = [];
  responseData: any;

  constructor(private apiService: ApiService) { }

  // getData(): void {
  //   this.apiService.getData().subscribe(response => {
  //     this.responseData = response;
  //   });
  // }

  // postData(): void{
  //   const data = { /* ... */ };
  //   this.apiService.postData(data).subscribe(response => {
  //     this.responseData = response;
  //   });
  // }

  ngOnInit() {
    const date = new Date("May 05, 2023 08:00:00");
    const duration = 60;
    const location = '1664 N Virginia St, Reno, NV 89557';
    this.apiService.getBestTimes(date, duration, location)
      .subscribe(response => {
        this.predictions = response.analysis.prediction;
      });
  }

}
