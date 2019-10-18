import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ConversationSpaceComponent } from './conversation-space/conversation-space.component';
import { ContactModule } from '../contact/contact.module';



@NgModule({
  declarations: [
    MessageComponent,
     ConversationSpaceComponent
    ],
  imports: [
    CommonModule,
    ContactModule
  ],
  exports: [
    MessageComponent,
    ConversationSpaceComponent
  ]
})
export class MessageModule { }
