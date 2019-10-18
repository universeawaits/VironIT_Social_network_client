import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'; 
import { Message } from '../../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {  
  private serverHost: string = 'https://localhost:44345/';

  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }
  
  sendMessage(message: Message) {  
    this._hubConnection.invoke('SendMessage', message);  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(
        this.serverHost + 'messageHub', 
        { accessTokenFactory: () => localStorage.getItem('jwt:token')}
      ).build();
  }
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('messageReceived', (data: any) => {  
      this.messageReceived.emit(data);  
    });  
  }  
}    