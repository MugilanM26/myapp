import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  city: string = '';
  date: string = '';
  weatherIcon: string = '';
  temperature: number = 0;
  description: string = '';
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    this.errorMessage = ''; // Clear any previous error message
    this.weatherService.getWeather(this.city)
      .subscribe(
        data => {
          // Handle successful response here
          this.date = new Date().toLocaleDateString();
          this.weatherIcon = data.weather[0].icon;
          this.temperature = data.main.temp;
          this.description = data.weather[0].description;
        },
        error => {
          // Handle error response here
          this.errorMessage = error; // Set error message received from the service
          console.error(error); // Log the error for debugging
        }
      );
  }
}
