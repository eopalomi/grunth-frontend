import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [SideNavComponent, MenuBarComponent, HomePageComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    PrimeNGModule,
    SidebarModule.forRoot(),
  ]
})
export class HomeModule { }
