import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'


@Component({
  selector: 'app-besttime',
  templateUrl: './besttime.component.html',
  styleUrls: ['./besttime.component.css']
})
export class BesttimeComponent implements OnInit {
  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://besttime.app/api/v1/forecasts/busy';
  private apiKey = 'pri_00f96178c208445c922a3b269e5a6d40'

  public bestTime: any;
  public error?: string;


  constructor(private http: HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');


    const params = new URLSearchParams({
      'api_key_private': this.apiKey,
      'venue_name': 'E. L. Wiegand Fitness Center',
      'venue_address': '1664 N Virginia St Reno, NV 89557 United States',
    }).toString();


    this.http.post(`${this.apiUrl}?${params}`, {}).subscribe(
      (data: any) => {
        console.log(data);
        this.bestTime = data;
        

       
      },
      (error: any) => {
        this.error = error.message;
      }
    );
  }
  
}