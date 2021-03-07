import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogPageService } from 'src/app/pages/services/dialog-page.service';
import { DatatypeInfo } from '../../interfaces/datatype-info';
import { DTypeBuilder } from '../../interfaces/dtype-builder';
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

  @Input() PAGE_INFO    : any;          // Informacion de la Pagina
  @Input() REGIST_DATA !: DTypeBuilder; // Informacion de Configuracion del Tipo de Dato
  
  datatypeInfo !: DatatypeInfo;
  value        !: string;
  isDisabled   !: boolean;

  constructor(private datatypeSerice: DatatypeService, private dialogPageService: DialogPageService) { }

  ngOnInit(): void {
    this.datatypeInfo  = this.datatypeSerice.buildDatatypeValues(this.REGIST_DATA);
  }

  onClick(){
    if (this.datatypeInfo.regist_dialogCon) { // Si hay Popup Abrirlo
      this.dialogPageService.buildDialog(this.datatypeInfo.regist_dialogCon);
    };
  }

  /************************* NG VALUE ACCESOR *************************/
  onChange = (_: any) => { };
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
  /**********************************************************************/
}
