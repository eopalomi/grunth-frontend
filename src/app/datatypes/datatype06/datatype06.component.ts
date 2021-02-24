import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datatype06',
  templateUrl: './datatype06.component.html',
  styleUrls: ['./datatype06.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype06Component),
      multi: true
    }
  ]
})
export class Datatype06Component implements OnInit, ControlValueAccessor, OnChanges {
  
  @Input() PAGE_INFO: any;       // Informacion Recibida de MasterPage
  @Input() REGIST_FORM_INFO!: any;       // Informacion Recibida de MasterPage
  select_options!: Compag[];
  selected!: Compag;
  registInfo: any = {};
  
  constructor() { }

  ngOnInit(): void {
    if (this.PAGE_INFO.page_type =='F') {
      this.registInfo = this.REGIST_FORM_INFO;
    }
    
    console.log("=====================> regist_opcselect", this.REGIST_FORM_INFO.regist_value, this.REGIST_FORM_INFO.regist_value);
    this.select_options = this.REGIST_FORM_INFO.regist_opcselect;
    
    this.selected = this.select_options?.find(value => value.co_compag === this.REGIST_FORM_INFO.regist_value)!;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    //console.log('Method not implemented.', this.DATATYPE_INFO);
    //console.log('ngChanges',this.DATATYPE_INFO, this.DATATYPE_INFO.idpage_datatype);
    //console.log('changes',changes);
    let cur;
    let prev;

    for (let propName in changes) {
      let chng = changes[propName];
      cur  = JSON.stringify(chng.currentValue);
      prev = JSON.stringify(chng.previousValue);
    }

    if (cur !== prev){
      console.log("===> Actualizando Datatype 06 - select", this.REGIST_FORM_INFO.regist_opcselect, this.REGIST_FORM_INFO.regist_value)
      this.select_options = this.REGIST_FORM_INFO.regist_opcselect;

      this.selected = this.select_options?.find(value => value.co_compag === this.REGIST_FORM_INFO.regist_value)!;
    }    
  }
  
  setSelect(value: Compag) {
    this.onTouch();

    if (!value) {
      this.onChange(null);
    } else {
      this.onChange(value.co_compag);
    }
  }

  /*********** NG_VALUE_ACCESSOR ***********/
  isDisabled!: boolean;
  onChange = (_: any) => { }
  onTouch = () => { }

  writeValue(value: any): void {
    if (value) {
      // this.selected.co_compag = value;
      // this.selected.no_compag = value;
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
  /******************************************/
}

/****************************************************/
/****************** INTERFACES **********************/
/****************************************************/
interface Select {
  select_key: string | null,
  select_value: string | null
};

interface Compag {
  co_compag: string | null,
  no_compag: string | null
};
/****************************************************/
/****************************************************/