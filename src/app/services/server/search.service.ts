import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contact } from 'src/app/model/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl: string = environment.appUrl + 'search';

  constructor(
    private httpClient: HttpClient
    ) { }

  getByPhoneOrEmail(emailOrPhone: string): Observable<Contact[]> {
    let result = new Observable<any>();
    result = this.httpClient.get(
      this.searchUrl + '/all?emailOrPhone=' + emailOrPhone,
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  getByFullEmail(email: string): Observable<Contact> {
    let result = new Observable<Contact>();
    result = this.httpClient.get<Contact>(
      this.searchUrl + '?email=' + email,
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }
}
