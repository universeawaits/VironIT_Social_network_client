import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ShareContactProfileBindingService {
  contactLoaded = new EventEmitter<Contact>();

  constructor() { }

  loadContact(contact: Contact) {
    this.contactLoaded.emit(contact);
  }
}
