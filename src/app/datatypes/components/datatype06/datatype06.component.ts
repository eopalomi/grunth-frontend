import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatatypeInfo } from '../../interfaces/datatype-info';
import { DTypeBuilder } from '../../interfaces/dtype-builder';
import { DatatypeService } from '../../services/datatype.service';

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
  
  @Input() PAGE_INFO    : any;          // Informacion de la Pagina
  @Input() REGIST_DATA !: DTypeBuilder; // Informacion de Configuracion del Tipo de Dato

  datatypeInfo   !: DatatypeInfo;
  select_options !: Compag[];
  selected       !: Compag;

  constructor(private datatypeSerice: DatatypeService) { }

  ngOnInit(): void {
    this.datatypeInfo = this.datatypeSerice.buildDatatypeValues(this.REGIST_DATA);

    // Arreglando el PlaceHolder
    this.datatypeInfo.regist_plholder = this.datatypeInfo.regist_plholder == '' ? 'Seleccione' : this.datatypeInfo.regist_plholder;
    
    this.selected = this.datatypeInfo.regist_opcselect?.find(value => value.co_compag === this.datatypeInfo.regist_value)!;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currentRegist;
    let previusRegist;
    
    for (let propName in changes) {
      let chng = changes[propName];
      
      currentRegist  = chng.currentValue;
      previusRegist  = chng.previousValue;
    }
    
    if (currentRegist !== undefined && previusRegist !== undefined) {
      if (JSON.stringify(currentRegist) !== JSON.stringify(previusRegist)) {
        this.datatypeInfo = this.datatypeSerice.buildDatatypeValues(currentRegist);

        // Arreglando el PlaceHolder
        this.datatypeInfo.regist_plholder = this.datatypeInfo.regist_plholder == '' ? 'Seleccione' : this.datatypeInfo.regist_plholder;

        this.selected = this.datatypeInfo.regist_opcselect?.find(value => value.co_compag === this.datatypeInfo.regist_value)!;
      }
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
interface Compag {
  co_compag: string | null,
  no_compag: string | null
};
/****************************************************/
/****************************************************/