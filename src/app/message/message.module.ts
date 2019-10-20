import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ConversationSpaceComponent } from './conversation-space/conversation-space.component';
import { ContactModule } from '../contact/contact.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EmojiDialogComponent } from './emoji-dialog/emoji-dialog.component';
import { MatDialogModule, MatSnackBarModule } from "@angular/material";
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    MessageComponent,
     ConversationSpaceComponent,
     EmojiDialogComponent
    ],
  imports: [
    CommonModule,
    ContactModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    MessageComponent,
    ConversationSpaceComponent
  ],
  entryComponents: [
    EmojiDialogComponent
  ]
})
export class MessageModule { }
