import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private urlPages: string = environment.urlPages;

  constructor(private http: HttpClient) { }

  getRoutes(id_usuari: any){
    return this.http.get(`${this.urlPages}/rutas`);
  };
}
