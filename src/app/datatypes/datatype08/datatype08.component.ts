import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  
  @Input() PAGE_INFO: any;       // Informacion Recibida de MasterPage
  @Input() REGIST_FORM_INFO!: any;       // Informacion Recibida de MasterPage
  registInfo: any = {};

  label: string ='';
  date!: Date;

  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    // console.log("this.REGIST_FORM_INFO 8", this.REGIST_FORM_INFO);
    // this.registInfo = this.REGIST_FORM_INFO.find(item => item.)

    // this.label = this.REGIST_FORM_INFO[0].REGIST_NAME;

    if (this.PAGE_INFO.page_type =='F') {
      this.registInfo = this.REGIST_FORM_INFO;
    }

    if (this.PAGE_INFO.page_type =='T') {
      
    }
  }

  writeValue(value: any): void {
    console.log("value", value);
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
}
