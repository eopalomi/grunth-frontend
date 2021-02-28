import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagePageService {

  private message = new Subject<object>();
  public  messageObservable = this.message.asObservable();;

  constructor() { }

  showAlert(title: string, body: string, type: string) {
    // this.messageService.clear();
    console.log("Entro a mensaje serviceeeeeeeeeeeeeee")
    // this.messageService.add({severity:type, summary: title, detail: body});
    
    this.message.next({title, body, type});
  }


}
