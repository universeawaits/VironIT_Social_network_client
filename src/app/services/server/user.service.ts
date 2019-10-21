import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.appUrl + 'users';

  constructor(
    private httpClient: HttpClient
  ) { }

  register(user: any) {
    let result: Observable<any>;
    result = this.httpClient.post(this.usersUrl, user, { responseType: 'text' });
    return result;
  }

  updateData(user: any) {
    let result: Observable<any>;
    result = this.httpClient.put(this.usersUrl, user,
    { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} });
    return result;
  }
}
