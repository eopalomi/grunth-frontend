import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  statuses: SelectItem[] = [];
  @ViewChild('dt') dt: any;
  
  data: Product [] = [
		{
			id: '1000',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1001',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1002',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1003',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1004',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1000',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1001',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1002',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1003',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1004',
			code: 'f230fh0g3',
			name: 'zapato Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1000',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1001',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1002',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1003',
			code: 'f230fh0g3',
			name: 'reloj Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},{
			id: '1004',
			code: 'f230fh0g3',
			name: 'camara Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},
  ];


  
  constructor() { }

  ngOnInit(): void {
    this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
  }

  log(anydate: any){
    console.log("Log===>", anydate);
  }

  applyFilterGlobal($event: Event) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}
