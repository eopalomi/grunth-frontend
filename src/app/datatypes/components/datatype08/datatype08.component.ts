import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DTypeBuilder } from '../../interfaces/dtype-builder';
import { DatatypeInfo } from '../../interfaces/datatype-info';
import { DatatypeService } from '../../services/datatype.service';

@Component({
  selector: 'app-datatype08',
  templateUrl: './datatype08.component.html',
  styleUrls: ['./datatype08.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype08Component),
      multi: true
    },DatePipe
  ]
})
export class Datatype08Component implements OnInit, ControlValueAccessor {
  
  @Input() PAGE_INFO    : any;          // Informacion de la Pagina
  @Input() REGIST_DATA !: DTypeBuilder; // Informacion de Configuracion del Tipo de Dato

  datatypeInfo !: DatatypeInfo;
  date         !: Date;

  constructor(private datePipe: DatePipe, private datatypeSerice: DatatypeService) { }

  ngOnInit(): void {
    this.datatypeInfo = this.datatypeSerice.buildDatatypeValues(this.REGIST_DATA);
  }

  onSelect(value: any){
    this.onTouch();

    if (!value){
      this.onChange(null);
    } else {
      this.onChange(this.datePipe.transform(value, 'yyyy-MM-dd'));
    }
  }

  clearCalendarValues(){
    this.onTouch();
    this.onChange(null);
  }

  /************************* NG VALUE ACCESOR *************************/
  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  writeValue(value: any): void {
    if (value) {
      this.date = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  /**********************************************************************/
}
