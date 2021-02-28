import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterPageComponent } from '../components/master-page/master-page.component';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class DialogPageService {

  dialog!: DynamicDialogRef;
  
  constructor(
    public dialogService: DialogService,
    public pageService: PageService,
    // public dialogReferen: DynamicDialogRef
  ) { }

  buildDialog(nu_conten: number){
    console.log( '====> Open popup - Container:', nu_conten);

    // Seteando Contenedor a Abrir
    this.pageService.contenedorDialog = nu_conten;

    this.dialog = this.dialogService.open(MasterPageComponent, {
      // header: 'Choose a Product',
      // data:{hola: "dato nuevo", parametro: 123},
      // width: '100%',
      showHeader: true,
      closable: true,
      contentStyle: {"height": "100vp", "min-width": "40vw", "padding":"0", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.dialog.onClose.subscribe( res => {
      this.pageService.contenedorDialog = null;
      console.log("Cerrando el Dialog -  Contenedor:", nu_conten);   
    });
  }

  closeDialog(){
    this.dialog.close();
  }
}
