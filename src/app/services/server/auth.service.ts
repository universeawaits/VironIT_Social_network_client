import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/model/user.profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hostUrl: string = environment.appUrl + 'accounts';

  constructor(
    private httpClient: HttpClient
    ) { }

  login(emailOrPhone: string, password: string): Observable<any> {
    let user = { EmailOrPhone: emailOrPhone, Password: password };
    return this.httpClient.post(this.hostUrl + '/token', user, { headers: { 'No-Auth' : 'True' }});
  }

  getUserData() {
    let result = new Observable<UserProfile>();
    result = this.httpClient.get<UserProfile>(
      this.hostUrl,
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')} }
    );
    return result;
  }

  logout(): Observable<any> {
    return this.httpClient.post(
      this.hostUrl + '/logout', 
      null, 
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token')}});
  }
}
