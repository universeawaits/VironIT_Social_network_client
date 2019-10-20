import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ForwardMessageService {
  receiverSelected = new EventEmitter<Contact>();

  constructor() { }

  forwardMesage(contact: Contact) {
    this.receiverSelected.emit(contact);
  }
}
