import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl: string = 'https://localhost:44345/contacts';

  constructor(
    private httpClient: HttpClient
    ) { }

  
  getAll() {
    let result = new Observable<any>();
    result = this.httpClient.get(
      this.contactsUrl + '/all',
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  addContact(contactEmail: string): Observable<any>  {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + '/addContact', 
      { ContactingUserEmail: localStorage.getItem('jwt:email'), ContactedUserEmail: contactEmail },
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  removeContact(contactEmail: string): Observable<any> {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + '/removeContact', 
      { ContactingUserEmail: localStorage.getItem('jwt:email'), ContactedUserEmail: contactEmail },
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }
}
