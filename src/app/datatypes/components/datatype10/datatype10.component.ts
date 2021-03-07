import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PageService } from 'src/app/pages/services/page.service';
import { DatatypeInfo } from '../../interfaces/datatype-info';
import { DTypeBuilder } from '../../interfaces/dtype-builder';
import { DatatypeService } from '../../services/datatype.service';

@Component({
  selector: 'app-datatype10',
  templateUrl: './datatype10.component.html',
  styleUrls: ['./datatype10.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype10Component),
      multi: true
    }
  ]
})
export class Datatype10Component implements OnInit, ControlValueAccessor {

  @Input() PAGE_INFO    : any;          // Informacion de la Pagina
  @Input() REGIST_DATA !: DTypeBuilder; // Informacion de Configuracion del Tipo de Dato

  datatypeInfo  !: DatatypeInfo;
  value         !: string;
  selectedData   : any;
  filteredData   : any[] = [];
  
  constructor(private datatypeSerice: DatatypeService, public pageService: PageService) { }

  ngOnInit(): void {
    this.datatypeInfo = this.datatypeSerice.buildDatatypeValues(this.REGIST_DATA);
  }

  filterData(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < this.datatypeInfo.regist_opcselect.length; i++) {
      let data = this.datatypeInfo.regist_opcselect[i];
      
      if (data.no_compag?.toLowerCase().indexOf(query.toLowerCase()) == 0) {  
        filtered.push(data);
      }
    }
    
    this.filteredData = filtered;
  }

  onSelect(value: any) {
    let param: any ={};

    this.value = value.co_compag;
    this.onTouch();
    this.onChange(this.value);

    param["va_" + this.datatypeInfo.regist_name] = value.co_compag;
    param["tx_" + this.datatypeInfo.regist_name] = value.no_compag;

    // Agregar Parametro
    this.pageService.addParam(param);
    
    // Recargar Paginas
    if (this.datatypeInfo.regist_pagref) {
      this.pageService.addPageRefresh(this.datatypeInfo.regist_pagref);
    }
  }

  onInput(value: string) {
    this.value = value;
    
    this.onTouch();
    this.onChange(this.value);
  }

  /************************* NG VALUE ACCESOR *************************/
  isDisabled!: boolean;
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

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  /**********************************************************************/
}

interface Compag {
  co_compag: string | null,
  no_compag: string | null
};