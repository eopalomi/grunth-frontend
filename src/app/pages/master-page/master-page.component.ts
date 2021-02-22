import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Conten } from '../interfaces/conten';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  
  // Configuracion del Contenedor
  public CONTEN_CONFIG!: any;

  constructor(public pageService: PageService) { }

  ngOnInit(): void {
    // Servicio Obtener Configuracion del Contenedor
    this.pageService.getConten(3).subscribe( res_service => {
      this.CONTEN_CONFIG = res_service;
    });
    
  }

  getGridPages(grid_position: any): object[] {
    let arrObj: object[] = [];

    arrObj.push(this.CONTEN_CONFIG.conten_pages.find((item: any) => item.grid_id === grid_position));
    // console.log("resultado: ", this.CONTEN_CONFIG.conten_pages.find((item: any) => item.grid_id === grid_position))
    return arrObj;
  }


}


/************* USADOS EN DURO ************/
// row_frame: object[] = [
//   { a1: 4, b1: 6 },
//   { a2: 11 },
//   { a3: 2, b3: 3, c3: 3, d3: 3 }
// ];