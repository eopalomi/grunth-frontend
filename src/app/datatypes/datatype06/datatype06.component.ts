import { Component, forwardRef, OnInit } from '@angular/core';
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
export class Datatype06Component implements OnInit, ControlValueAccessor {

  select_options!: Select[];
  selected!: Select;

  constructor() { }

  ngOnInit(): void {
    this.select_options = [
      { select_key: 'New York', select_value: 'NY' },
      { select_key: 'Rome', select_value: 'RM' },
      { select_key: 'London', select_value: 'LDN' },
      { select_key: 'Istanbul', select_value: 'IST' },
      { select_key: 'Paris', select_value: 'PRS' }
    ];
  }

  setSelect(value: Select) {
    this.onTouch();

    if (!value) {
      this.onChange(null);
    } else {
      this.onChange(value.select_value);
    }
  }

  /*********** NG_VALUE_ACCESSOR ***********/
  isDisabled!: boolean;
  onChange = (_: any) => { }
  onTouch = () => { }

  writeValue(value: any): void {
    if (value) {
      this.selected.select_value = value;
      this.selected.select_key = value;
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
/****************************************************/
/****************************************************/