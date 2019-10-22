import { Component, OnInit, NgZone, Input, OnDestroy } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../services/server/message.service';
import { Subscription } from 'rxjs';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Contact } from 'src/app/model/contact';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';
import { EmojiIntoMessageService } from 'src/app/services/component/emoji-into-message.service';

import { Image as FileToSend } from 'src/app/services/server/image.service';
import { MediaService } from 'src/app/services/server/media.service';
import { MessageMedia } from 'src/app/model/message-media';
import { SnackbarService } from 'src/app/services/component/snackbar.service';
import { ShareContactMessageBindingService } from 'src/app/services/component/share-contact-message-binding.service';
import { environment } from 'src/environments/environment';
import { ContactProfileComponent } from 'src/app/contact/contact-profile/contact-profile.component';
import { ContactService } from 'src/app/services/server/contact.service';
import { SearchService } from 'src/app/services/server/search.service';
import { ContactListSearchBindingService } from 'src/app/services/component/contact-list-search-binding.service';
import { ShareContactProfileBindingService } from 'src/app/services/component/share-contact-profile-binding.service';

@Component({
  selector: 'conversation-space',
  templateUrl: './conversation-space.component.html',
  styleUrls: ['./conversation-space.component.scss']
})
export class ConversationSpaceComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  private contactEmailSubscription: Subscription;
  receiver: Contact = new Contact();

  fromEmail: string;
  toEmail: string;
  messageText: string = '';
  message: Message = new Message();
  messageMedia: MessageMedia;

  private selectedFile: FileToSend; 

  emojiDialogOpened: boolean;

  constructor(
    private messageService: MessageService,  
    private _ngZone: NgZone,
    private messageContactBindingService: ContactListProfileBindingService,
    private emojiService: EmojiIntoMessageService,
    private shareContactService: ShareContactMessageBindingService,
    private shareProfileBindingService: ShareContactProfileBindingService,
    private emojiDialog: MatDialog,
    private sharedContactProfileDialog: MatDialog,
    private snackbarService: SnackbarService,
    private mediaService: MediaService,
    private searchService: SearchService,
  ) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    this.contactEmailSubscription = this.messageContactBindingService.getContact()
        .subscribe(
          contact => {
            if (this.toEmail != contact.user.email) {
              this.toEmail = contact.user.email;
              this.messageService.getHistory(this.toEmail).subscribe(
                messages => { 
                  this.messages = messages;
                  this.messages.forEach(
                    message => {
                      if (message.type == 'Media') {
                        message.messageMedia.link = environment.appUrl + message.messageMedia.link;
                      }
                    });
                });
              this.receiver = contact;      
            }
        });

    this.fromEmail = localStorage.getItem('jwt:email');
    this.emojiDialogOpened = false;
  }

  openEmojiDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.panelClass = 'emoji-dialog';
    dialogConfig.restoreFocus = false;

    this.emojiDialog.afterOpened.subscribe(
      () => this.emojiDialogOpened = true
    );
    this.emojiDialog.afterAllClosed.subscribe(
      () => this.emojiDialogOpened = false
    );

    this.emojiDialog.open(EmojiDialogComponent, dialogConfig);
  }

  sendTextMessage() {
    if (this.messageText) {
      this.message = new Message();
      this.message.fromEmail = this.fromEmail;
      this.message.toEmail = this.toEmail;
      this.message.dateTime = new Date();
      this.message.forwardFromEmail = null;
      this.message.text = this.messageText;
      this.message.type = 'Text';
      this.messageMedia = null;
      this.messageService.sendMessage(this.message);

      this.messageText = '';
    }
  }

  sendMediaMessage() {
    this.message = new Message();
    this.message.fromEmail = this.fromEmail;
    this.message.toEmail = this.toEmail;
    this.message.dateTime = new Date();
    this.message.forwardFromEmail = null;
    this.message.text = null;
    this.message.type = 'Media';
    this.message.messageMedia = this.messageMedia;

    this.messageService.sendMessage(this.message);
  }

  sendContact(contact: Contact, contactToMessage: Contact) {
    this.message = new Message();
    this.message.fromEmail = this.fromEmail;
    this.message.toEmail = contactToMessage.user.email;
    this.message.dateTime = new Date();
    this.message.forwardFromEmail = null;
    this.message.text = contact.user.email;
    this.message.type = 'Contact';
    this.message.messageMedia = null;

    this.messageService.sendMessage(this.message);
  }

  openSharedContactProfileDialog(email: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.restoreFocus = false;
    this.searchService.getByFullEmail(email).subscribe(
      _contact => {
        this.sharedContactProfileDialog.open(ContactProfileComponent, dialogConfig);
        this.shareProfileBindingService.loadContact(_contact);
      }
    );
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
        if (message.type == 'Media') {
          message.messageMedia.link = environment.appUrl + message.messageMedia.link;
        }
        this.messages.push(message);
      });
    });

    this.emojiService.emojiSelected.subscribe(emoji =>
        this.messageText += emoji
    );

    this.shareContactService.contactToMessageSelected.subscribe(contact => {
        this.sendContact(this.shareContactService.contactToShare, contact);
      }
    );
  }

  ngOnDestroy() {
    this.contactEmailSubscription.unsubscribe();
    this.emojiDialog.closeAll();
  }

  processFile(fileInput: any) {
    const file: File = fileInput.files[0];
    const reader = new FileReader();

    if (file) {
      reader.addEventListener('load', (event: any) => {
        this.selectedFile = new FileToSend(event.target.result, file);
  
        let size = file.size;
        let type = this.getMediaType(file.type);
  
        if (!this.filterFileInput(size, type)) return;
  
        this.mediaService.uploadFile(this.selectedFile.file, file.type).subscribe(
          _messageMedia => {
            _messageMedia.type = type;
            this.messageMedia = _messageMedia;
            this.sendMediaMessage();
          },
          response => {
            this.selectedFile.link = '';
          });
      });
  
      reader.readAsDataURL(file);
    }
  }

  private filterFileInput (size: number, type: string): boolean {
    let imageMaxSize = 2048 * 1024;
    let audioMaxSize = 10240 * 1024;
    let videoMaxSize = 40960 * 1024;

    if (size > imageMaxSize && type == 'Image') {
      this.snackbarService.open('image size up to 2mb', false);
      return false;
    }

    if (size > videoMaxSize) {
        this.snackbarService.open('file size is too large', false);
        return false;
    }

    if (size > audioMaxSize && type == 'Audio') {
      this.snackbarService.open('audio size up to 10mb', false);
      return false;
    }

    if (size > videoMaxSize && type == 'Video') {
      this.snackbarService.open('video size up to 40mb', false);
      return false;
    }

    return true;
  }

  getMediaType(standType: string): string {
    if (standType.includes('image')) {
      return 'Image';
    }
    
    if (standType.includes('video')) {
      return 'Video';
    }

    if (standType.includes('audio')) {
      return 'Audio';
    }
  }
}
