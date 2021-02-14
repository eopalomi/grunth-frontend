import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos de Prime NG
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    BadgeModule,
    BreadcrumbModule,
    InputTextModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    PanelMenuModule,
    PanelModule,
    RippleModule,
    SplitButtonModule,
    SlideMenuModule,
    ToastModule,
    ToolbarModule
  ],
  exports: [
    ButtonModule,
    BadgeModule,
    BreadcrumbModule,
    InputTextModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    PanelMenuModule,
    PanelModule,
    RippleModule,
    SplitButtonModule,
    SlideMenuModule,
    ToastModule,
    ToolbarModule
  ]
})
export class PrimeNGModule { }
