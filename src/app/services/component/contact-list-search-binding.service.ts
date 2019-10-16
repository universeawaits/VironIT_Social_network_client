import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactListSearchBindingService {
  private searchString = new Subject<string>();

  constructor() { }

  getContacts(): Observable<string> {
    return this.searchString.asObservable();
  }

  searchContacts(emailOrPhone: string) {
    this.searchString.next(emailOrPhone);
  }
}
