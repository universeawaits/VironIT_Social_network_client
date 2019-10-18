import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageContactBindingService {
  private contactEmail = new Subject<string>();

  constructor() { }

  getEmail(): Observable<string> {
    return this.contactEmail.asObservable();
  }

  updateEmail(contactEmail: string) {
    this.contactEmail.next(contactEmail);
  }
}
