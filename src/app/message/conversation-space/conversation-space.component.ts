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
  private fromEmail: string;
  private toEmail: string;
  private messageText: string = '';
  private messages: Message[] = [];
  message = new Message();

  constructor(  
    private messageService: MessageService,  
    private _ngZone: NgZone,
    private messageContactBindingService: MessageContactBindingService
  ) {
    this.subscribeToEvents();  
  }

  ngOnInit() {
    this.contactEmailSubscription = this.messageContactBindingService.getEmail()
        .subscribe(
          email => {
            this.toEmail = email;
            this.messageService.getHistory(this.toEmail).subscribe(
              messages => {
                this.messages = messages;
              }
            );
        });

    this.fromEmail = localStorage.getItem('jwt:email');
  }

  sendMessage() {
    if (this.messageText) {  
      this.message = new Message();
      this.message.fromEmail = localStorage.getItem('jwt:email');
      this.message.toEmail = this.toEmail;
      this.message.text = this.messageText;  
      this.message.dateTime = new Date();
      this.messageService.sendMessage(this.message);  
      this.messageText = '';
    }  
  }

  private subscribeToEvents(): void {
    this.messageService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {
        this.messages.push(message);
      });
    });
  }

  ngOnDestroy() {
    this.contactEmailSubscription.unsubscribe();
  }
}
