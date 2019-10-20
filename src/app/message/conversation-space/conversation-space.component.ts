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

@Component({
  selector: 'conversation-space',
  templateUrl: './conversation-space.component.html',
  styleUrls: ['./conversation-space.component.scss']
})
export class ConversationSpaceComponent implements OnInit, OnDestroy {
  private messages: Message[] = [];

  private contactEmailSubscription: Subscription;
  private receiver: Contact = new Contact();

  private fromEmail: string;
  private toEmail: string;
  private messageText: string = '';
  private message: Message = new Message();
  private messageMedia: MessageMedia;

  private selectedFile: FileToSend; 


  constructor(
    private messageService: MessageService,  
    private _ngZone: NgZone,
    private messageContactBindingService: ContactListProfileBindingService,
    private emojiService: EmojiIntoMessageService,
    private emojiDialog: MatDialog,
    private snackBar: MatSnackBar,
    private mediaService: MediaService
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
                }
              );        

              this.receiver = contact;      
            }
        });

    this.fromEmail = localStorage.getItem('jwt:email');
  }

  openEmojiDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.panelClass = 'emoji-dialog';
    dialogConfig.restoreFocus = false;

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
            console.log(_messageMedia.link, _messageMedia.type);
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
      this.openSnackBar('image size up to 2mb', 4);
      return false;
    }

    if (size > videoMaxSize) {
        this.openSnackBar('file size is too large', 4);
        return false;
    }

    if (size > audioMaxSize && type == 'Audio') {
      this.openSnackBar('audio size up to 10mb', 4);
      return false;
    }

    if (size > videoMaxSize && type == 'Video') {
      this.openSnackBar('video size up to 40mb', 4);
      return false;
    }

    return true;
  }
  
  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'ok', {
      duration: duration * 1000,
      panelClass: [ 'snack-success' ],
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
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
