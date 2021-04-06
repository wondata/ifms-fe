import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
declare var Ext: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  @Output() toggleSidebarClicked: EventEmitter<any> = new EventEmitter();

  menuStatus = true;

  ngOnInit(): void {
    this.isHome();
  }
  isHome(): void {
    if (this.router.url === '/home') {
      this.menuStatus = false;
    }
  }

  toggleSidebar(): void {
    this.toggleSidebarClicked.emit();
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}
