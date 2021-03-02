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
    let getPlHold : string = regist_name + "_plhold";
    let getDiaCon : string = regist_name + "_dialog";

    registInfo.regist_name      = regist_name,
    registInfo.regist_value     = data[regist_name],
    registInfo.regist_datatype  = data[getType],
    registInfo.regist_status    = data[getEst],
    registInfo.regist_color     = data[getColor],
    registInfo.regist_icon      = data[getIco],
    registInfo.regist_conten    = data[getConte],
    registInfo.regist_opcselect = data[getDatsel],
    registInfo.regist_pagref    = data[getPagRef]
    registInfo.regist_plholder  = data[getPlHold]
    registInfo.regist_dialogCon = data[getDiaCon]

    return registInfo;
  }


  buildDatatypeInfo_v2(regist_name: string, regist_title: string, data_regist: any): object {
    console.log("Build Datatype ===========>:",{regist_name, regist_title, data_regist})

    let registInfo: any = {};

    // Informacion para Configurar el Tipo de Dato
    let getType   : string = regist_name + "_type";
    let getEst    : string = regist_name + "_est";
    let getColor  : string = regist_name + "_color";
    let getIco    : string = regist_name + "_ico";
    let getConte  : string = regist_name + "_conten";
    let getDatsel : string = regist_name + "_datsel";
    let getPagRef : string = regist_name + "_pagref";
    let getPlHold : string = regist_name + "_plhold";
    let getDiaCon : string = regist_name + "_dialog";

    registInfo.regist_name      = regist_name;
    registInfo.regist_value     = data_regist[regist_name];
    registInfo.regist_datatype  = data_regist[getType];
    registInfo.regist_status    = data_regist[getEst];
    registInfo.regist_color     = data_regist[getColor];
    registInfo.regist_icon      = data_regist[getIco];
    registInfo.regist_conten    = data_regist[getConte];
    registInfo.regist_opcselect = data_regist[getDatsel];
    registInfo.regist_pagref    = data_regist[getPagRef];
    registInfo.regist_plholder  = data_regist[getPlHold];
    registInfo.regist_dialogCon = data_regist[getDiaCon];
    registInfo.regist_title     = regist_title;

    return registInfo;
  }
}
