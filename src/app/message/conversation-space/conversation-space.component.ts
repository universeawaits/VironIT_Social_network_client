import { Component, OnInit, NgZone, Input, OnDestroy } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../services/server/message.service';
import { MessageContactBindingService } from 'src/app/services/component/message-contact-binding.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'conversation-space',
  templateUrl: './conversation-space.component.html',
  styleUrls: ['./conversation-space.component.scss']
})
export class ConversationSpaceComponent implements OnInit, OnDestroy {
  private contactEmailSubscription: Subscription;
  private toEmail: string;
  private messageText: string = '';
  private messages: Message[] = [
    { dateTime: new Date(), toEmail: 'ccc@ccc.ccc', fromEmail: '', text: 'hi',  status: 'sent' },
    { dateTime: new Date(), toEmail: 'ccc@ccc.ccc', fromEmail: '', text: 'are you here?',  status: 'sent' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'hi, yeah',  status: 'received' },
    { dateTime: new Date(), toEmail: 'ccc@ccc.ccc', fromEmail: '', text: 'what did you think about.. ff f fff ffffff f ff ....?',  status: 'sent' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'oh such a good idea',  status: 'received' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'oh such a good idea',  status: 'sent' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'rrrrroh such a good idea',  status: 'received' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'ahahaha',  status: 'received' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'wtf',  status: 'received' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'ffffoh such a good idea',  status: 'sent' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'oh such a good idea',  status: 'sent' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'ssssoh such a good idea',  status: 'received' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'oh such a good idea',  status: 'sent' },
    { dateTime: new Date(), toEmail: '', fromEmail: 'ccc@ccc.ccc', text: 'oh such a good idea',  status: 'received' },
    { dateTime: new Date(), toEmail: 'ccc@ccc.ccc', fromEmail: '', text: 'what did you think about.. ff f ddddd ddd f ff ....?',  status: 'sent' },
  ];
  message = new Message();

  constructor(  
    private messageService: MessageService,  
    private _ngZone: NgZone,
    private messageContactBindingService: MessageContactBindingService
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
    this.contactEmailSubscription = this.messageContactBindingService.getEmail()
        .subscribe(
          email => {
            this.toEmail = email;
            this.messages.push({
              dateTime: new Date(), toEmail: 'ccc@ccc.ccc', fromEmail: '', text: email,  status: 'sent'
            })
        });
  }

  ngOnDestroy() {
    this.contactEmailSubscription.unsubscribe();
  }
}
