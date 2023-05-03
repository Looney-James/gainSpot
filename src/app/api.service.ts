import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://besttime.app/api/v1/forecasts';

  constructor(private http: HttpClient) { }


  getChartData(): Observable<any> {
    const params = {
        'api_key_private': 'pri_579f6f48a4ef45be9157b06afbe8cd27',
        'venue_name': 'E. L. Wiegand Fitness Center',
        'venue_address': '1664 N Virginia St Reno, NV 89557 United States'
    };
    return this.http.post<any>(this.apiUrl, params);
  }


//   getFootTrafficData() {
//     const url = "https://besttime.app/api/v1/forecasts";
//     const params = {
//         'api_key_private': 'pri_579f6f48a4ef45be9157b06afbe8cd27',
//         'venue_name': 'E. L. Wiegand Fitness Center',
//         'venue_address': '1664 N Virginia St Reno, NV 89557 United States'
//     };
//     return this.http.post(url, params);
//   }

//   getData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   postData(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, data);
//   }

    // getBestTimes(date: Date, duration: number, location: string): Observable<any> {
    //     const timestamp = Math.floor(date.getTime() / 1000);
    //     const data = {
    //         api_key_private: 'pri_579f6f48a4ef45be9157b06afbe8cd27',
    //         start: timestamp,
    //         end: timestamp + duration * 60,
    //         interval: 1800,
    //         location: location,
    //     };
    //     const url = '${this.apiUrl}forecasts';
    //     //console.log(url, data);
    //     return this.http.post(url, data)
    //         .pipe(
    //             map(response =>{
    //                 const predictions = response.analysis.prediction;
    //                 const hoursData = predictions.reduce((acc, cur) =>{
    //                     const hour = new Date(cur.timestamp_utc * 1000).getHours();
    //                     if (!acc[hour]) {
    //                         acc[hour] = {
    //                             count: 0,
    //                             sun: 0,
    //                         };
    //                     }
    //                     acc[hour].count += 1;
    //                     acc[hour].sum += cur.analysis.foot_traffic.score;
    //                     return acc;
    //                 }, {});
    //                 const hours = Object.keys(hoursData);
    //                 const footTrafficData = hours.map(hour => {
    //                     const avgFootTraffic = hoursData[hour].sum / hoursData[hour].count;
    //                     return{
    //                         hour: Number(hour),
    //                         footTraffic: avgFootTraffic,
    //                     };
    //                 });
    //                 return footTrafficData;
    //             })
    //         );        
    // }

    

}
