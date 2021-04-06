import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit {
  screenWidth: number;
  sideBarOpen = true;
  tabletScreenSize = 1024;

  constructor() {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > this.tabletScreenSize) {
      this.sideBarOpen = true;
    } else {
      this.sideBarOpen = false;
    }

    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;

      if (this.screenWidth > this.tabletScreenSize) {
        this.sideBarOpen = true;
      } else {
        this.sideBarOpen = false;
      }
    };
  }

  ngOnInit(): void {}

  sidebarToggler(event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
