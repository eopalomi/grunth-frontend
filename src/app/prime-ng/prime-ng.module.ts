import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos de Prime NG
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    BadgeModule,
    BreadcrumbModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    PanelMenuModule,
    PanelModule,
    RippleModule,
    SplitButtonModule,
    SlideMenuModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  exports: [
    ButtonModule,
    BadgeModule,
    BreadcrumbModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    PanelMenuModule,
    PanelModule,
    RippleModule,
    SplitButtonModule,
    SlideMenuModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ]
})
export class PrimeNGModule { }
