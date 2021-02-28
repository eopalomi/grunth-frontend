import { Component, Input, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PageService } from 'src/app/pages/services/page.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  nombreConten!: string;

  public items: MenuItem[] = [];
  public home: MenuItem = {};

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    
    this.pageService.eventChanged.subscribe(res =>{
      this.nombreConten = res;
      this.items = [
        // {label: 'Computer', routerLink:'/side'},
        {label: this.nombreConten},
        // {label: 'Accessories'},
        // {label: 'Backpacks'},
        // {label: 'Item'}
    ];
    });
    

    
    this.home = {icon: 'pi pi-home', routerLink: '/home'};
    
  }

}