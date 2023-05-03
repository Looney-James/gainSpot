import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://besttime.app/api/v1/';

  constructor(private http: HttpClient) { }

//   getData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   postData(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, data);
//   }

    getBestTimes(date: Date, duration: number, location: string): Observable<any> {
        const timestamp = Math.floor(date.getTime() / 1000);
        const data = {
            api_key_private: 'pri_579f6f48a4ef45be9157b06afbe8cd27',
            start: timestamp,
            end: timestamp + duration * 60,
            interval: 1800,
            location: location,
        };
        return this.http.post('${this.apiURL}forecasts', data);
    }

}
