import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AwsService } from '../services/aws.service';
import { Subscription, interval, take } from 'rxjs';
import Chart from 'chart.js/auto';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: Subscription | undefined;

  public chart: any;
  
  tempArr : number[] = [];
  humArr : number[] = [];

  temperature: number = 0;

  dataTest: any;

  constructor(private AWSService: AwsService) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    // this.onData();
    this.onDataTest();
  }

  ngOnInit(): void {
    console.log("TEST MODE");
    this.createChart();
  }

  onData() {
    this.subscription = this.AWSService.getDataWithInterval().subscribe(data => {
      this.tempArr.push(data.Items[0].temp);
      this.humArr.push(data.Items[0].hum);
      this.temperature = data.Items[0].temp;
      this.addData(this.chart, data.Items[0].date, this.tempArr, this.humArr);
    });
  }

  onDataTest() {
    this.dataTest = interval(2000);
    this.dataTest.pipe(take(20)).subscribe((x: any) => {
      let temp = Math.floor(Math.random() * 28);
      this.tempArr.push(temp);
      this.humArr.push(Math.floor(Math.random() * (70 - 40 + 1) + 40));
      this.temperature = temp;
      this.addData(this.chart, DateTime.now().toString(), this.tempArr, this.humArr);
    });
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperature',
            data: [],
            backgroundColor: 'blue'
          },
          {
            label: 'Humidity',
            data: [],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  addData(chart: Chart, label: String, newData: number[], newData2: number[]) {
    chart.data.labels?.push(label);
    // chart.data.datasets.forEach((dataset) => {
    //   dataset.data.push(newData);
    // });
    chart.data.datasets[0].data = newData;
    chart.data.datasets[1].data = newData2;
    chart.update();
  }




}
