declare var Ext: any;
import { Component, OnInit } from '@angular/core';

Ext.require(['Ext.panel.Accordion']);

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isPhone: boolean = Ext.os.is.Phone;
  mediumText = 'text';

  ngOnInit(): void {}
}
