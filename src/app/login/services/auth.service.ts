import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

interface Usuario {
  user?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.urlPages;
  userToken!: string | null;

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  login(usuario: Usuario) {
    const autData = {
      ...usuario
    };

    return this.http.post(`${this.url}/login`, autData)
      .pipe(
        map( (resp: any) => {
          console.log("respuesta login",resp);

          this.guardarToken(resp.token, resp.nombreUsuario);

          return resp;
        })
      );
  }

  private guardarToken(idToken: string, usuName: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('usuarioLogeado', usuName);

    let hoy = new Date();
    hoy.setSeconds(3600); // una hora

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = null;
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (!this.userToken) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();

    expiraDate.setTime(expira);
    console.log("==================>esta autenticado: ", expiraDate > new Date() ? true : false)
    return expiraDate > new Date() ? true : false;
  }

  logout() {
    console.log("Saliendo del Sistema");
    localStorage.removeItem('token');
  }
}
