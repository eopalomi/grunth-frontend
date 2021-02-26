import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatypeService {
  
  constructor() { }

  buildDataTypeInfo(regist_name:string, data: any): object {
    let registInfo: any = {};
    // Informacion para Configurar el Tipo de Dato
    let getType   : string = regist_name + "_type";
    let getEst    : string = regist_name + "_est";
    let getColor  : string = regist_name + "_color";
    let getIco    : string = regist_name + "_ico";
    let getConte  : string = regist_name + "_conten";
    let getDatsel : string = regist_name + "_datsel";
    let getPagRef : string = regist_name + "_pagref";

    registInfo.regist_name      = regist_name,
    registInfo.regist_value     = data[regist_name],
    registInfo.regist_datatype  = data[getType],
    registInfo.regist_status    = data[getEst],
    registInfo.regist_color     = data[getColor],
    registInfo.regist_icon      = data[getIco],
    registInfo.regist_conten    = data[getConte],
    registInfo.regist_opcselect = data[getDatsel],
    registInfo.regist_pagref    = data[getPagRef]

    return registInfo;
}

}
