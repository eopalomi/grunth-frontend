import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  items: MenuItem[] = [];
  menuSide: MenuItem[] = [];
  routes: any;

  constructor(
    private routeService: RoutesService
  ) { }

  ngOnInit(): void {
    // Rutas del Menu Navegacion
    this.routeService.getRoutes(null).subscribe( res => {
      this.routes = res;

      this.crearMenu(this.routes);

      console.log("============ > menuSide", this.menuSide)
    });
  };

  crearMenu(menu: any[]){
    menu.forEach((element: { displayName: any; iconNamePrimeNg:any; route:any; id_conten:any; children:any;}) => {
      let objMenu: any = {};
      
      // console.log("element.displayName", element.displayName);

      objMenu.label = element.displayName;
      objMenu.icon  = element.iconNamePrimeNg;

      if (element.route) {
        objMenu.routerLink  =  ['/' + element.route];
        objMenu.queryParams  =  {'nu_conten': element.id_conten};
      }
      
      if (element.children) {
        let objItemArr: any[] = [];
        
        element.children.forEach((element: { displayName: any; iconNamePrimeNg: any; route: any; id_conten: any; }) => {
          let objItems: any = {};  

          objItems.label       = element.displayName;
          objItems.icon        = element.iconNamePrimeNg;
          objItems.routerLink  =  ['/' + element.route];
          objItems.queryParams =  {'nu_conten': element.id_conten};

          objItemArr.push(objItems);
        });

        objMenu.items = objItemArr;
      };
      

      this.menuSide.push(objMenu)
    });

  }
}
