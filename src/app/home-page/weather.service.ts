import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'b6b25b56d53530608a21ba6436f2f37c';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('City not found'); 
        }
        return throwError('Something went wrong');
      })
    );
  }
}


