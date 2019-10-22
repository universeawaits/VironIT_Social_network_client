import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Contact } from 'src/app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactListSearchBindingService {
  searchString = new Subject<string>();

  constructor() { }

  getSearchString(): Observable<string> {
    return this.searchString.asObservable();
  }

  searchContacts(emailOrPhone: string) {
    this.searchString.next(emailOrPhone);
  }

  searchByFullEmail () {
    
  }
}
