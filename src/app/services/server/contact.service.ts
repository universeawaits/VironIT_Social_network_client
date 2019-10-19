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

  block(contactEmail: string): Observable<any>  {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + '/block', 
      { BlockingUserEmail: localStorage.getItem('jwt:email'), BlockedUserEmail: contactEmail },
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  unblock(contactEmail: string): Observable<any> {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + '/unblock', 
      { BlockingUserEmail: localStorage.getItem('jwt:email'), BlockedUserEmail: contactEmail },
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  changePseudonym(contactEmail: string, pseudo: string) {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + '/setPseudonym', 
      { PseudoFromUserEmail: 
          localStorage.getItem('jwt:email'), 
        PseudoForUserEmail: 
          contactEmail, 
        PseudonymRaw: 
          pseudo },
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }
}
