import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chart: any;
  chart1: any
  today: any;
  xValues = ["Italy", "France", "Spain", "USA", "Argentina", "Italy", "France", "Spain", "USA", "Argentina"];
  yValues = [55, 20, 55, 19, 44, 24, 15, 44, 24, 15];
  barColors = ["red", "green", "blue", "orange", "brown"];
  // =============
  xValue = ["Italy", "France", "Spain", "USA", "Argentina"];
  yValue = [55, 49, 44, 24, 15];
  barColor = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
  ];
  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.createChart();
    // this.createChartV1();
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: "bar",
      data: {
        labels: this.xValues,
        datasets: [{
          backgroundColor: this.barColors,
          data: this.yValues
        }]
      },
      options: {
        scales: {
          myScale: {
            type: 'logarithmic',
            position: 'right', // `axis` is determined by the position as `'y'`
          }
        }
      }
    })

  }

  // createChartV1() {

  //   this.chart1 = new Chart("myChart", {
  //     type: "doughnut",
  //     data: {
  //       labels: this.xValue,
  //       datasets: [{
  //         backgroundColor: this.barColor,
  //         data: this.yValue
  //       }]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: "World Wide Wine Production 2018";
  //       }
  //     }
  //   });
  // }
}
