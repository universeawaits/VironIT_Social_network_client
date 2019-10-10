import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactListProfileBindingService {
  private contact = new Subject<Contact>();

  constructor() { }

  getContact(): Observable<Contact> {
    return this.contact.asObservable();
  }

  updateContact(contact: Contact) {
    this.contact.next(contact);
  }
}
