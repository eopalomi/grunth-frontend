import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatatypeService } from '../../services/datatype.service';

@Component({
  selector: 'app-datatype01',
  templateUrl: './datatype01.component.html',
  styleUrls: ['./datatype01.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype01Component),
      multi: true
    }
  ]
})
export class Datatype01Component implements OnInit, ControlValueAccessor {

  @Input() PAGE_INFO     : any; // Informacion de la Pagina 
  @Input() DATATYPE_INFO : any; // Informacion de Configuracion del Tipo de Dato
  

  @Input() REGIST_NAME: any;       
  @Input() REGIST_TABLE_INFO: any;
  @Input() REGIST_FORM_INFO!: any;   
  @Input() TITLE!: any;   
  registInfo: any = {};
  hideIs: boolean = false; // Esconder
  isReadOnly: boolean = false; // Solo Lectura
  placeHolder!: string;

  value!: string;
  isDisabled!: boolean;

  constructor(private datatypeSerice: DatatypeService) { }

  ngOnInit(): void {
    if (this.PAGE_INFO.page_type =='F') {
      this.registInfo = this.REGIST_FORM_INFO;

      if (this.registInfo.regist_status == 'O') {
          this.hideIs = true;
      }

      if (this.registInfo.regist_status == 'L') {
        this.isReadOnly = true;
      }
    }

    if (this.PAGE_INFO.page_type =='T') {
      this.registInfo = this.datatypeSerice.buildDataTypeInfo(this.REGIST_NAME, this.REGIST_TABLE_INFO);
    }

    if (!this.REGIST_FORM_INFO.regist_plholder){
      this.placeHolder = '';
    } else {
      this.placeHolder = this.REGIST_FORM_INFO.regist_plholder;
    };
  }

  /***** NG VALUE ACCESOR *****/
  onChange = (_:any) => { }
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
  /****************************/
}
