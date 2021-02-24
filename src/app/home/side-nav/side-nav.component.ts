import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RoutesService } from '../services/routes.service';

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

  crearMenu(menu: any[]){
    menu.forEach((element: { displayName: any; iconNamePrimeNg:any; route:any; id_conten:any; children:any;}) => {
      let objMenu: any = {};
      
      // console.log("element.displayName", element.displayName);

      objMenu.label = element.displayName;
      objMenu.icon  = element.iconNamePrimeNg;

      if (element.route) {
        objMenu.routerLink  =  [element.route];
        objMenu.queryParams  =  {'nu_conten': element.id_conten};
      }
      
      if (element.children) {
        let objItemArr: any[] = [];
        
        element.children.forEach((element: { displayName: any; iconNamePrimeNg: any; route: any; id_conten: any; }) => {
          let objItems: any = {};  

          objItems.label       = element.displayName;
          objItems.icon        = element.iconNamePrimeNg;
          objItems.routerLink  =  [element.route];
          objItems.queryParams =  {'nu_conten': element.id_conten};

          objItemArr.push(objItems);
        });

        objMenu.items = objItemArr;
      };
      

      this.menuSide.push(objMenu)
    });

    // console.log("this.menuSide:", this.menuSide)
    // console.log("this.items:", this.items)
  }

  ngOnInit(): void {
    // Rutas del Menu Navegacion
    this.routeService.getRoutes(null).subscribe( res => {
      this.routes = res;
      this.crearMenu(this.routes);

      // console.log("this.routes", this.routes);
    });


    this.items = [
      {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-plus',
          items: [
            { label: 'User', icon: 'pi pi-fw pi-user-plus', url: '/table' },
            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
          ]
        },
        { label: 'Open', icon: 'pi pi-fw pi-external-link' },
        { separator: true },
        { label: 'Quit', icon: 'pi pi-fw pi-times' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        // items: [
        //   { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        //   { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        // ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      }
    ];

  }

}
