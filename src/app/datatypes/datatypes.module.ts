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
import { Datatype09Component } from './datatype09/datatype09.component';
import { Datatype10Component } from './datatype10/datatype10.component';
import { Datatype02Component } from './datatype02/datatype02.component';


@NgModule({
  declarations: [Datatype01Component, Datatype06Component, Datatype08Component, Datatype10Component, Datatype09Component, Datatype02Component],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeNGModule
  ],
  exports:[
    Datatype01Component,
    Datatype02Component,
    Datatype06Component,
    Datatype08Component,
    Datatype09Component,
    Datatype10Component
  ]
})
export class DatatypesModule { }
