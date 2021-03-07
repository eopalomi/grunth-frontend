import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatatypeInfo } from '../../interfaces/datatype-info';
import { DTypeBuilder } from '../../interfaces/dtype-builder';
import { DatatypeService } from '../../services/datatype.service';

@Component({
  selector: 'app-datatype02',
  templateUrl: './datatype02.component.html',
  styleUrls: ['./datatype02.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype02Component),
      multi: true
    }
  ]
})
export class Datatype02Component implements OnInit, ControlValueAccessor {

  @Input() PAGE_INFO    : any;          // Informacion de la Pagina
  @Input() REGIST_DATA !: DTypeBuilder; // Informacion de Configuracion del Tipo de Dato
  
  datatypeInfo !: DatatypeInfo;
  value        !: string;
  isDisabled   !: boolean;

  constructor(private datatypeSerice: DatatypeService) { }

  ngOnInit(): void {
    this.datatypeInfo = this.datatypeSerice.buildDatatypeValues(this.REGIST_DATA);
  }

  /************************* NG VALUE ACCESOR *************************/
  onChange = (_: any) => { };
  onTouch = () => { }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  /**********************************************************************/

}
