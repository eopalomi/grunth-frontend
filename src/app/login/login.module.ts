import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modulos
import { DatatypesModule } from '../datatypes/datatypes.module';

// Librerias Adicionales
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

// Componentes
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule,
    DatatypesModule
  ]
})
export class LoginModule { }
