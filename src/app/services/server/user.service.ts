import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://localhost:44345/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  register(user: any) {
    let result: Observable<any>;
    result = this.httpClient.post(this.usersUrl + '/register', user, { responseType: 'text' });
    return result;
  }

  updateData(user: any) {
    let result: Observable<any>;
    result = this.httpClient.post(this.usersUrl + '/updateData', user,
    { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} });
    return result;
  }
}
