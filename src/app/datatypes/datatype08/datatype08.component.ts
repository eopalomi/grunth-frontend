import { Component, forwardRef, OnInit } from '@angular/core';
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
  date!: Date;

  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor(private datePipe: DatePipe) { }

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

  ngOnInit(): void {
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
