import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ShareContactMessageBindingService {
  contactToMessageSelected = new EventEmitter<Contact>();
  contactToShare: Contact;
  
  constructor() { }

  share(contactToMessage: Contact) {
    this.contactToMessageSelected.emit(contactToMessage);
  }

  setContactToShare(contactToShare: Contact) {
    this.contactToShare = contactToShare;
  }
}
