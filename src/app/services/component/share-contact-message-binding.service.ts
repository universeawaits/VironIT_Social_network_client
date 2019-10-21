import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ShareContactMessageBindingService {
  contactSelected = new EventEmitter<Contact>();

  constructor() { }

  shareContact(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}
