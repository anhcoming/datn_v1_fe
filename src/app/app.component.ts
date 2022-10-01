import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  currentUrl: any
  show = false
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
      if (this.currentUrl == "/login" || this.currentUrl == "/" ||
        this.currentUrl == "/forgot-password"
      ) {
        this.show = true;
      } else {
        this.show = false
      }
    });
  }
  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
