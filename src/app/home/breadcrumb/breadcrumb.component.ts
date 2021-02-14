import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  public items: MenuItem[] = [];
  public home: MenuItem = {};

  constructor() { }

  ngOnInit(): void {
    this.items = [
        {label: 'Computer', routerLink:'/side'},
        {label: 'Notebook'},
        {label: 'Accessories'},
        {label: 'Backpacks'},
        {label: 'Item'}
    ];
    
    this.home = {icon: 'pi pi-home', routerLink: '/home'};
  }

}