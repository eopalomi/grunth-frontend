import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PageService } from 'src/app/pages/services/page.service';
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

  @Input() PAGE_INFO: any;          // Informacion Recibida de MasterPage
  @Input() REGIST_FORM_INFO!: any;  // Informacion Recibida de MasterPage
  @Input() REGIST_NAME: any;       
  @Input() REGIST_TABLE_INFO: any;

  value!: string;
  selectedData: any;
  filteredData: any[] = [];
  registInfo: any = {};

  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor(private datatypeSerice: DatatypeService, public pageService: PageService) { }

  ngOnInit(): void {
    if (this.PAGE_INFO.page_type =='F') {
      console.log("this.REGIST_FORM_INFO", this.REGIST_FORM_INFO);
      this.registInfo = this.REGIST_FORM_INFO;
    }

    if (this.PAGE_INFO.page_type =='T') {
      this.registInfo = this.datatypeSerice.buildDataTypeInfo(this.REGIST_NAME, this.REGIST_TABLE_INFO);
      // console.log("DATATYPE TABLE:", this.registInfo)
    }
  }

  filterData(event: any) {
    
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < this.registInfo.regist_opcselect.length; i++) {
      let data = this.registInfo.regist_opcselect[i];
      
      if (data.no_compag.toLowerCase().indexOf(query.toLowerCase()) == 0) {  
        filtered.push(data);
      }
    }
    
    this.filteredData = filtered;
    console.log("console.log(this.filteredData)",this.filteredData)
  }


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

  onSelect(value: any) {
    this.value = value.co_compag;
    this.onTouch();
    this.onChange(this.value);

    // console.log(" ===> ", dato_select.co_compag)
    let param: any ={};

    param["va_" + this.registInfo.regist_name] = value.co_compag;
    param["tx_" + this.registInfo.regist_name] = value.no_compag;

    // Agregar Parametro
    this.pageService.addParam(param);
    
    // Recargar Paginas
    if (this.registInfo.regist_pagref) {
      this.pageService.addPageRefresh(this.registInfo.regist_pagref);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}

interface Compag {
  co_compag: string | null,
  no_compag: string | null
};