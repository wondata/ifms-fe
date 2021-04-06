import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LayoutDefaultComponent } from './default/default.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderHelpComponent } from './shared/header-help/header-help.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutDefaultComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    HeaderHelpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSliderModule,
    MatTableModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatGridListModule,
    ExtAngularModernModule,
    NgxPermissionsModule,
  ],
})
export class LayoutModule {}
