import { Component, OnInit, NgZone, Input, OnDestroy } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../services/server/message.service';
import { Subscription } from 'rxjs';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Contact } from 'src/app/model/contact';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';
import { EmojiIntoMessageService } from 'src/app/services/component/emoji-into-message.service';

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

  private receiver: Contact = new Contact();

  constructor(
    private messageService: MessageService,  
    private _ngZone: NgZone,
    private messageContactBindingService: ContactListProfileBindingService,
    private emojiService: EmojiIntoMessageService,
    private emojiDialog: MatDialog
  ) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    this.contactEmailSubscription = this.messageContactBindingService.getContact()
        .subscribe(
          contact => {
            this.toEmail = contact.user.email;
            this.messageService.getHistory(this.toEmail).subscribe(
              messages => {
                this.messages = messages;
              }
            );

            this.receiver = contact;
        });

    this.fromEmail = localStorage.getItem('jwt:email');
  }

  openEmojiDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.panelClass = 'emoji-dialog';

    this.emojiDialog.open(EmojiDialogComponent, dialogConfig);
    
}

  sendMessage() {
    if (this.messageText) {  
      this.message = new Message();
      this.message.fromEmail = this.fromEmail;
      this.message.toEmail = this.toEmail;
      this.message.text = this.messageText;  
      this.message.dateTime = new Date();
      this.messageService.sendMessage(this.message);  
      this.messageText = '';
    }  
  }

  clearHistory() {
    this.messageService.clearHistory(this.toEmail).subscribe(
      () => {
        this.messages = [];
      }
    )
  }

  private subscribeToEvents() {
    this.messageService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {
        this.messages.push(message);
      });
    });

    this.emojiService.emojiSelected.subscribe(emoji =>
      this._ngZone.run(() => {
        this.messageText += emoji;
      })
    );
  }

  ngOnDestroy() {
    this.contactEmailSubscription.unsubscribe();
  }
}
