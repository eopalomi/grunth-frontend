import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatypeService {
  registInfo: any = {};
  constructor() { }

  buildDataTypeInfo(regist_name:string, data: any): object {
    // Informacion para Configurar el Tipo de Dato
    let getType   : string = regist_name + "_type";
    let getEst    : string = regist_name + "_est";
    let getColor  : string = regist_name + "_color";
    let getIco    : string = regist_name + "_ico";
    let getConte  : string = regist_name + "_conten";
    let getDatsel : string = regist_name + "_datsel";
    let getPagRef : string = regist_name + "_pagref";

    this.registInfo.regist_name      = regist_name,
    this.registInfo.regist_value     = data[regist_name],
    this.registInfo.regist_datatype  = data[getType],
    this.registInfo.regist_status    = data[getEst],
    this.registInfo.regist_color     = data[getColor],
    this.registInfo.regist_icon      = data[getIco],
    this.registInfo.regist_conten    = data[getConte],
    this.registInfo.regist_opcselect = data[getDatsel],
    this.registInfo.regist_pagref    = data[getPagRef]

    return this.registInfo;
}

}
