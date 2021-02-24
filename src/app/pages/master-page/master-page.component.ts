import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
  providers:[DynamicDialogRef, DynamicDialogConfig]
})
export class MasterPageComponent implements OnInit, OnDestroy {
  
  // Configuracion del Contenedor
  public CONTEN_CONFIG!: any;
  private paramSubscribe!: any;
  dataModal: any;

  constructor(
    public config: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
    public pageService: PageService, 
    private paramRoute: ActivatedRoute
  ) { }
  
  ngOnDestroy(): void {
    this.paramSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.paramSubscribe = this.paramRoute.queryParams.subscribe( params => {
      // Servicio Obtener Configuracion del Contenedor
      // params.nu_conten

      
      if (this.pageService.contenedorDialog){
        console.log("==========================> CARGANDO CONTENEDOR DIALOG:", this.pageService.contenedorDialog);
        this.pageService.getConten(this.pageService.contenedorDialog).subscribe( res_service => {
          console.log("content res_service", res_service) ;
          this.CONTEN_CONFIG = res_service;
        });
      } else {
        console.log("==========================> CARGANDO CONTENEDOR NORMAL:", this.pageService.contenedorDialog);
        this.pageService.getConten(params.nu_conten).subscribe( res_service => {
          this.CONTEN_CONFIG = res_service;

          this.pageService.addContenName(this.CONTEN_CONFIG.conten_name);
        });
      }
    });
  }

  getGridPages(grid_position: any): object[] {
    let arrObj: object[] = [];

    arrObj.push(this.CONTEN_CONFIG.conten_pages.find((item: any) => item.grid_id === grid_position));
    
    return arrObj;
  }
}
