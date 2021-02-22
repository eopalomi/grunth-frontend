import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modulos
import { DatatypesModule } from '../datatypes/datatypes.module';

// Librerias Adicionales
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

// Componentes del Modulo
import { MasterPageComponent } from './master-page/master-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { FormPageComponent } from './form-page/form-page.component';


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
  ]
})
export class PagesModule { }
