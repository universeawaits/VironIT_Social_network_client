import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../services/server/message.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'conversation-space',
  templateUrl: './conversation-space.component.html',
  styleUrls: ['./conversation-space.component.scss']
})
export class ConversationSpaceComponent implements OnInit {
  toEmail: string;
  messageText: string = '';
  messages: Message[] = [];  
  message = new Message();

  constructor(  
    private messageService: MessageService,  
    private _ngZone: NgZone  
  ) {  
    this.subscribeToEvents();  
  }

  sendMessage(): void {  
    if (this.messageText) {  
      this.message = new Message();
      this.message.fromEmail = localStorage.getItem('jwt:email');
      this.message.toEmail = this.toEmail;
      this.message.status = "sent";
      this.message.text = this.messageText;  
      this.message.dateTime = new Date();
      this.messages.push(this.message);
      this.messageService.sendMessage(this.message);  
      this.messageText = '';
    }  
  }

  private subscribeToEvents(): void {
    this.messageService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {
        if (message.fromEmail !== localStorage.getItem('jwt:email')) {  
          message.status = "received";
          this.messages.push(message);
        }  
      });
    });  
  }

  ngOnInit() {
  }
}
