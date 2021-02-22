import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getConten(id_conten: number) {
    let httpParams = new HttpParams();
    
    httpParams = httpParams.append('id_conten', id_conten.toString())

    return this.http.get(`${this.url}/contenedor`, { params: httpParams })
  }

  getPagina(id_pagina: number){
    let httpParams = new HttpParams();
    
    httpParams = httpParams.append('id_pagina', id_pagina.toString())

    return this.http.get(`${this.url}/pagina`, { params: httpParams })
  }
}
