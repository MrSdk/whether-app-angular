import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { WhetherService } from 'src/app/shared/services/whether.service';
import { Cities } from "../../../assets/city"

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-whether-app',
  templateUrl: './whether-app.component.html',
  styleUrls: ['./whether-app.component.css']
})
export class WhetherAppComponent implements OnInit {
  private subscription: Subscription;
  public options: any = {
    chart: {
      type: 'spline',
      height: 700
    },
    title: {
      text: 'Temperature of Day (days[].temp.day)'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return '<b>x: </b>' + Highcharts.dateFormat('%e %b %y', this.x) +
          ' <br> <b>y: </b>' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      
    ]
  }
  constructor(private whetherSvc: WhetherService) { 
    this.getData()
  }

  ngOnInit(){
    Highcharts.chart('container', this.options);
  }

  getData(){

    Cities.forEach((city,i) => {
      this.subscription = this.whetherSvc.getCloudData( city.lat,city.lng ).subscribe( (data: any) => {
          const temp_day = [];
          data.daily.forEach(day => {
            const temp_row = [
              new Date(day.dt * 1000).getTime(),
              day.temp.day
            ];
            temp_day.push(temp_row)
          });
          // this.options.series[0]['data'] = temp_day;
          this.options.series[i] = {
            name: city.name,
            turboThreshold: 5000,
            data: temp_day
          }
          // this.options.series[1]['data'] = updated_abnormal_data;
          Highcharts.chart('container', this.options);
        },
        error => {
          console.log('Something went wrong.');
        })
      
    });
    
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
