import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Librerias Adicionales
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

// Componentes
import { Datatype01Component } from './components/datatype01/datatype01.component';
import { Datatype06Component } from './components/datatype06/datatype06.component';
import { Datatype08Component } from './components/datatype08/datatype08.component';
import { Datatype09Component } from './components/datatype09/datatype09.component';
import { Datatype10Component } from './components/datatype10/datatype10.component';
import { Datatype02Component } from './components/datatype02/datatype02.component';
import { Datatype03Component } from './components/datatype03/datatype03.component';


@NgModule({
  declarations: [Datatype01Component, Datatype06Component, Datatype08Component, Datatype10Component, Datatype09Component, Datatype02Component, Datatype03Component],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeNGModule
  ],
  exports:[
    Datatype01Component,
    Datatype02Component,
    Datatype03Component,
    Datatype06Component,
    Datatype08Component,
    Datatype09Component,
    Datatype10Component
  ]
})
export class DatatypesModule { }
