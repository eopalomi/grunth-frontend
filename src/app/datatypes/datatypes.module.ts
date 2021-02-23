import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Librerias Adicionales
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

// Componentes
import { Datatype01Component } from './datatype01/datatype01.component';
import { Datatype06Component } from './datatype06/datatype06.component';
import { Datatype08Component } from './datatype08/datatype08.component';
import { TableDatatype01Component } from './table/table-datatype01/table-datatype01.component';



@NgModule({
  declarations: [Datatype01Component, Datatype06Component, Datatype08Component, TableDatatype01Component],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeNGModule
  ],
  exports:[
    Datatype01Component,
    Datatype06Component,
    Datatype08Component
  ]
})
export class DatatypesModule { }
