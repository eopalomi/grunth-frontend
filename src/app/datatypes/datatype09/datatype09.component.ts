import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatatypeService } from '../services/datatype.service';

@Component({
  selector: 'app-datatype09',
  templateUrl: './datatype09.component.html',
  styleUrls: ['./datatype09.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype09Component),
      multi: true
    }
  ]
})
export class Datatype09Component implements OnInit, ControlValueAccessor {
  @Input() PAGE_INFO: any;       // Informacion Recibida de MasterPage
  
  @Input() REGIST_NAME: any;       
  @Input() REGIST_TABLE_INFO: any;
  @Input() REGIST_FORM_INFO!: any;   
  registInfo: any = {};

  value!: string;
  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor(private datatypeSerice: DatatypeService) { }

  ngOnInit(): void {
    if (this.PAGE_INFO.page_type =='F') {
      this.registInfo = this.REGIST_FORM_INFO;
    }

    if (this.PAGE_INFO.page_type =='T') {
      this.registInfo = this.datatypeSerice.buildDataTypeInfo(this.REGIST_NAME, this.REGIST_TABLE_INFO);
    }
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

  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
