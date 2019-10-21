import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'; 
import { Message } from '../../model/message';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {  
  private hostUrl: string = environment.appUrl;

  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor(
    private httpClient: HttpClient
  ) {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }
  
  sendMessage(message: Message) {
    this._hubConnection.invoke('SendMessage', message);  
  }

  getHistory(withEmail: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      this.hostUrl + 'messages/history?withEmail=' + withEmail, 
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token') } }
      );
  }

  clearHistory(withEmail: string) {
    return this.httpClient.delete(
      this.hostUrl + 'messages/history?withEmail=' + withEmail, 
      { headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('jwt:token') } }
      );
  }
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(
        this.hostUrl + 'hubs/message?token=' + localStorage.getItem('jwt:token'),
        { accessTokenFactory: () => localStorage.getItem('jwt:token') }
      ).build();
  }
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {
        this.connectionIsEstablished = true;
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {
        setTimeout(function () { this.startConnection(); }, 5000);  
      });
  }
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('messageReceived', (data: any) => {  
      this.messageReceived.emit(data);  
    });
  }  
}    