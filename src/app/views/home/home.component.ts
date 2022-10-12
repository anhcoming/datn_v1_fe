import { Chart } from 'chart.js/auto';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today: any;
  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
  }

}
