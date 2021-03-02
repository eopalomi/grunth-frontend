import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

   @Output() showMenu = new EventEmitter();
   
   items: MenuItem[] = [];
   autoDisplay: boolean = true;
   userSystem!: string | null;
   constructor(private primengConfig: PrimeNGConfig, public authService: AuthService, private router: Router) { }

   ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.userSystem = localStorage.getItem('usuarioLogeado');;

      this.items = [
      {
         label:'Configuracion',
         icon:'pi pi-fw pi-cog',
      },
      {
         label:'Perfil',
         icon:'pi pi-fw pi-user',
      },
      {
         separator:true
      },
      {
         label:'Salir',
         icon:'pi pi-fw pi-power-off',
         command: () => {
            this.logout();
        }
      }
      ];
  }

  public toogleMenu(){
     this.showMenu.emit(null);
  };

  logout() {
   this.authService.logout();
   this.router.navigateByUrl('/login');
 }

}
