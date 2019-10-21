import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl: string = environment.appUrl + 'contacts/';

  constructor(
    private httpClient: HttpClient
    ) { }

  
  getAll() {
    let result = new Observable<any>();
    result = this.httpClient.get(
      this.contactsUrl,
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  changeContactStatus(contactEmail: string): Observable<any> {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl, 
      { ContactingUserEmail: localStorage.getItem('jwt:email'), ContactedUserEmail: contactEmail },
    );
    return result;
  }

  block(contactEmail: string): Observable<any>  {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + 'blocks', 
      { BlockingUserEmail: localStorage.getItem('jwt:email'), BlockedUserEmail: contactEmail }
    );
    return result;
  }

  unblock(contactEmail: string): Observable<any> {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + 'blocks', 
      { BlockingUserEmail: localStorage.getItem('jwt:email'), BlockedUserEmail: contactEmail }
    );
    return result;
  }

  changePseudonym(contactEmail: string, pseudo: string) {
    let result = new Observable<any>();
    result = this.httpClient.post(
      this.contactsUrl + 'pseudonyms', 
      { PseudoFromUserEmail: localStorage.getItem('jwt:email'), 
        PseudoForUserEmail: contactEmail, 
        PseudonymRaw: pseudo }
    );
    return result;
  }
}
