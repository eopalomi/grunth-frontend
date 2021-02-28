import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos
import { PagesModule } from '../pages/pages.module';

// Librerias Adicionales
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SidebarModule } from 'ng-sidebar';

// Componentes del Modulo
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [SideNavComponent, MenuBarComponent, HomePageComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    PrimeNGModule,
    PagesModule,
    SidebarModule.forRoot()
  ]
})
export class HomeModule { }
