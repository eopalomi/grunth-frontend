import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  value!: string;
  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor() { }

  ngOnInit(): void {}

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
    console.log("esta disabled:", isDisabled)
    this.isDisabled = isDisabled;
  }


}
