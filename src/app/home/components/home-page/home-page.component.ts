import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MessagePageService } from 'src/app/pages/services/message-page.service';
import { PageService } from 'src/app/pages/services/page.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [MessageService]
})
export class HomePageComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  showMessage: any;

  constructor(private messageService: MessageService, private messagePageService: MessagePageService) { }

 
  tipoSlideMenu: string = 'push';
  closeOnClickOutside: boolean = false;
  showBackdrop: boolean = false;
  nombreModulo!: string;

  row_frame: object[] = [
    {a1:4, b1:4, c1:4},
    {a2:2, b2:3, c2:4, d2:3},
    {a3:6, b3:6}
  ];


  opened: boolean = false;
 
  public _toggleSidebar() {
    this.opened = !this.opened;
  }
  
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  
  ngOnDestroy(): void {
    this.showMessage.unsubscribe();
  }

  ngOnInit(): void {
    this.showMessage = this.messagePageService.messageObservable.subscribe((res: any) =>{
      //console.log("subscripcion al res:", res);

      this.showMessages(res.title,res.body,res.type);
    })

    const screenWidth = window.innerWidth;

    if (screenWidth <= 768){
      this.tipoSlideMenu = 'over';
      this.showBackdrop = true;
      this.closeOnClickOutside = true;
    } else {
      this.tipoSlideMenu = 'push';
      this.showBackdrop = false;
      this.closeOnClickOutside = false;
    }
    
  //   this.items = [
  //     {
  //         label: 'Options',
  //         items: [{
  //             label: 'Update',
  //             icon: 'pi pi-refresh',
  //             command: () => {
  //                 this.update();
  //             }
  //         },
  //         {
  //             label: 'Delete',
  //             icon: 'pi pi-times',
  //             command: () => {
  //                 this.delete();
  //             }
  //         }
  //     ]},
  //     {
  //         label: 'Navigate',
  //         items: [{
  //             label: 'Angular',
  //             icon: 'pi pi-external-link',
  //             url: 'http://angular.io'
  //         },
  //         {
  //             label: 'Router',
  //             icon: 'pi pi-upload',
  //             routerLink: '/fileupload'
  //         }
  //     ]}
  // ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 768){
      this.tipoSlideMenu = 'over';
      this.showBackdrop = true;
      this.closeOnClickOutside = true;
    } else {
      this.tipoSlideMenu = 'push';
      this.showBackdrop = false;
      this.closeOnClickOutside = false;
    }
  }

  showMessages(title: string, body: string, type: string) {
    
    this.messageService.add({severity: type, summary: title, detail: body});
  }

  // update() {
  //   this.messageService.add({severity:'success', summary:'Success 111', detail:'Data Updated'});
  // }

  // delete() {
  //   this.messageService.add({severity:'warn', summary:'Delete', detail:'Data Deleted'});
  // }

}
