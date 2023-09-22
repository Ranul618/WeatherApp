import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather:any;
  temperature:Number=0;
  feelslike:number=0;
  pressure:number=0;
  humidity:number=0;
  summary:string='';
  iconUrl:string='';
  city:string='Colombo';
  units:string='metric';
  maxtemp:number=0;
  mintemp:number=0;
  description:string='';
  visibility:number=0;
  windspeed:number=0;
  apikey:string='e93f715178531d39db578f6e717f8ed6';


  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.getWeather();
  }


  getWeather(){


    
    this.weatherService.getweather(this.city, this.units, this.apikey).subscribe({

      next: (res)=>{
        console.log(res)
        this.myWeather=res;
        console.log(this.myWeather)
        this.temperature=this.myWeather.main.temp;
        this.feelslike=this.myWeather.main.feels_like;
        this.pressure=this.myWeather.main.pressure;
        this.humidity=this.myWeather.main.humidity;
        this.summary=this.myWeather.weather[0].main;
        this.iconUrl='https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
        this.maxtemp=this.myWeather.main.temp_max;
        this.mintemp=this.myWeather.main.temp_min;
        this.description=this.myWeather.weather[0].description;
        this.visibility=this.myWeather.visibility;
        this.windspeed=this.myWeather.wind.speed;
        
      },

      error:(error)=>console.log(error.message),
      //complete:()=>console.log('API Call Completed')

    })}


  

  onRadioButtonChange() {
    if (this.units == 'imperial') {
      this.units = 'metric';
    } else {
      this.units = 'imperial';
    }

    this.getWeather();
  }

}

