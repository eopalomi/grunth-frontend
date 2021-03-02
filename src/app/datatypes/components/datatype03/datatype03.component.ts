import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogPageService } from 'src/app/pages/services/dialog-page.service';
import { DatatypeService } from '../../services/datatype.service';

@Component({
  selector: 'app-datatype03',
  templateUrl: './datatype03.component.html',
  styleUrls: ['./datatype03.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datatype03Component),
      multi: true
    }
  ]
})
export class Datatype03Component implements OnInit {

  @Input() PAGE_INFO: any;       // Informacion Recibida de MasterPage
  
  @Input() REGIST_NAME: any;       
  @Input() REGIST_TABLE_INFO: any;
  @Input() REGIST_FORM_INFO!: any;   
  @Input() TITLE!: any;
  
  registInfo: any = {};
  hideIs: boolean = false; // Esconder
  isReadOnly: boolean = false; // Solo Lectura

  value!: string;
  isDisabled!: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor(private datatypeSerice: DatatypeService, private dialogPageService: DialogPageService) {
  
  }

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


  }

  onClick(){
    console.log("entro")
    // Si hay Popup Abrirlo
    if (this.registInfo.regist_dialogCon) {
      this.dialogPageService.buildDialog(this.registInfo.regist_dialogCon);
    };
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
