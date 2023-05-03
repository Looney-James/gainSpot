import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { response } from 'express';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';

import * as Chart from 'chart.js/auto';

@Component({
  selector: 'app-best-time',
  templateUrl: './best-time.component.html',
  styleUrls: ['./best-time.component.css'],
    
})
export class BestTimeComponent implements OnInit {
  // footTraffic: any;

  // chartData: ChartDataSets[] = [];
  // chartLabels: Label[] = [];
  // chartOptions: ChartOptions = {};
  // chartType: ChartType = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
  }

  // ngOnInit(): void {
  //   this.apiService.getChartData().subscribe(data => {
  //     console.log(data);

  //     const chartData: ChartDataSets[] = [
  //       {
  //         data: data.analysis.hour_analysis.map(hour => hour.score),
  //         label: 'Score'
  //       }
  //     ];

  //     const chartLabels: Label[] = data.analysis.hour_analysis.map(hour => hour.hour);

  //     const chartOptions: ChartOptions = {
  //       responsive: true,
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     };

  //     const chartType: ChartType = 'bar';

  //     this.chartData = chartData;
  //     this.chartLabels = chartLabels;
  //     this.chartOptions = chartOptions;
  //     this.chartType = chartType;
  //   });
  // }


  
  
  
  
  
  // ngOnInit() {
  //   this.apiService.getFootTrafficData().subscribe((data) => {
  //     this.footTraffic = data;
  //   });
  // }

  // @ViewChild('chart', {static: true })
  // private chartRef: ElementRef;

  // predictions: any[];
  // footTrafficData: {hour: number, footTraffic: number }[];

  // responseData: any;

  // constructor(private apiService: ApiService) { }

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

  // ngOnInit() {
  //   const date = new Date();
  //   const duration = 24 * 60;
  //   const location = '1664 N Virginia St, Reno, NV 89557';
    
  //   this.apiService.getBestTimes(date, duration, location)
  //     .subscribe(footTrafficData => {
  //       console.log(response);
  //       this.footTrafficData = footTrafficData;
  //       this.createChart();
  //     });
  // }

  // private createChart(){
  //   const ctx = this.chartRef.nativeElement.getContext('2d');
  //   const data = {
  //     labels: this.footTrafficData.map(data => data.hour),
  //     datasets: [
  //       {
  //         label: 'Foot Traffic',
  //         backgroundColor: 'rgba(o, 0, 255, 0.5)',
  //         borderColor: 'rgba(0, 0, 255, 1)',
  //         borderWidth: 1,
  //         data: this.footTrafficData.map(data => data.footTraffic),
  //       },
  //     ],
  //   };
  //   const options = {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       }],
  //     },
  //   };
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: data,
  //     options: options,
  //   });
  // }

}
