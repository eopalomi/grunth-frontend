import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  url: string = environment.urlPages;
  private enviarParamsSubject = new Subject<object>();
  enviarParamsObservable = this.enviarParamsSubject.asObservable();
  eventChanged = new Subject<string>();

  public nombreContenedor!: string;
  public contenedorDialog!: number | null;

  PARAMS_PAGE: any = {};

  addContenName(event: string) {
    this.nombreContenedor = event;
    
    this.eventChanged.next(this.nombreContenedor);
  }

  constructor(private http: HttpClient) { }

  getConten(id_conten: number) {
    let httpParams = new HttpParams();
    
    httpParams = httpParams.append('id_conten', id_conten?.toString())

    return this.http.get(`${this.url}/contenedor`, { params: httpParams })
  }

  getPagina(id_pagina: number){
    let httpParams = new HttpParams();
    
    httpParams = httpParams.append('id_pagina', id_pagina?.toString())
    
    // Crear Query Params
    if (this.PARAMS_PAGE !== undefined){
      httpParams = httpParams.append('params_page',JSON.stringify(this.PARAMS_PAGE))
    };

    return this.http.get(`${this.url}/pagina`, { params: httpParams })
  }

  propag(nu_pagina: string, nu_boton: string, propagBody: object){
    //console.log("Llamando al servicio propag (nu_pagina, nu_boton, propagBody): ", nu_pagina, nu_boton, propagBody);
    
    // Inicializar Objeto Parametros
    let httpParams = new HttpParams();

    // Crear Query Params
    if (nu_pagina !== undefined){
      httpParams = httpParams.append('id_pagina', nu_pagina);
    }

    // Crear Query Params
    if (nu_boton !== undefined){
      httpParams = httpParams.append('id_boton',  nu_boton);
    }
    
    
    // Crear Query Params
    if (this.PARAMS_PAGE !== undefined){
      httpParams = httpParams.append('params_page', JSON.stringify(this.PARAMS_PAGE))
    };
    
    return this.http.post(`${this.url}/propag`, propagBody, { params: httpParams });
  };

  addParam(params: any){
    for (const prop in params) {
      this.PARAMS_PAGE[prop] = params[prop];
    };
    
    this.enviarParamsSubject.next(this.PARAMS_PAGE);

    console.log("***** Agregando Parametros:", params);
    console.log("***** Parametros Totales:", this.PARAMS_PAGE);
  };

  removeParam(key: any){
    delete this.PARAMS_PAGE[key];
  };

  addPageRefresh(value: number){
    console.log("***** Agregando Paginas Recargar:", value);
    
    this.PARAMS_PAGE.pages_to_refresh = value;
    this.enviarParamsSubject.next(this.PARAMS_PAGE);

    this.removePageRefresh();
  };

  removePageRefresh(){
    this.PARAMS_PAGE.pages_to_refresh = null;
  };










}
