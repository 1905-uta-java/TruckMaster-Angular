import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PendingService } from './pending.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl: string = "https://api.openweathermap.org/data/2.5/forecast?q=";
  key: string = "&units=imperial&appid=b10b5270e863beb70ac90cc41b548ca1";

  constructor(
    private http: HttpClient,
    private pendingService: PendingService
    ) { }
  
  getForecasts(location: string, onSuccess: (result) => void, onFailure: (error) => void) {

    this.pendingService.pendingEvent.emit(true);

    let qUrl = this.baseUrl + location + this.key;

    this.http.get(
      qUrl
    ).toPromise()
      .then((result) => {
        this.pendingService.pendingEvent.emit(false);
        onSuccess(result);
      }).catch((error) => {
        this.pendingService.pendingEvent.emit(false);
        onFailure(error);
      });
  }
}
