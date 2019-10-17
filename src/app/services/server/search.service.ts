import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl: string = 'https://localhost:44345/search';

  constructor(
    private httpClient: HttpClient
    ) { }

  getByPhoneOrEmail(emailOrPhone: string) {
    let result = new Observable<any>();
    result = this.httpClient.get(
      this.searchUrl + '/all?emailOrPhone=' + emailOrPhone,
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }
}
