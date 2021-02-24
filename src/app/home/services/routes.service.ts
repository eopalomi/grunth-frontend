import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRoutes(id_usuari: any){
    return this.http.get(`${this.url}/rutas`);
  };
}
