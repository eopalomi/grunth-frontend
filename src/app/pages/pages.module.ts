import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modulos
import { DatatypesModule } from '../datatypes/datatypes.module';

// Librerias Adicionales
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

// Componentes del Modulo
import { MasterPageComponent } from './components/master-page/master-page.component';
import { TablePageComponent } from './components/table-page/table-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';

// Providers
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    MasterPageComponent, 
    TablePageComponent, 
    FormPageComponent
  ],
  imports: [
    CommonModule,
    DatatypesModule,
    FormsModule,
    HttpClientModule,
    PrimeNGModule,
    ReactiveFormsModule
  ],
  exports:[
    MasterPageComponent, 
    TablePageComponent, 
    FormPageComponent
  ],
  
  providers: [DialogService, MessageService]
})
export class PagesModule { }
