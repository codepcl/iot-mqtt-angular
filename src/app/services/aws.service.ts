import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, mergeMap } from 'rxjs';
import { SensorDHT11 } from '../models/sensor-dht11.model';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  private API_URL = 'https://l2ofp2kvnf.execute-api.us-east-1.amazonaws.com/';

  constructor(private http: HttpClient) { }

  getData(): Observable<SensorDHT11> {
    return this.http.get<SensorDHT11>(`${this.API_URL}`);
  }

  getDataWithInterval(): Observable<any> {
    return interval(2000).pipe(
      mergeMap(() => this.http.get<any>(`${this.API_URL}`))
    );
  }
}
