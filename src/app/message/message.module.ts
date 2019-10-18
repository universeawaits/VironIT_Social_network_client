import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ConversationSpaceComponent } from './conversation-space/conversation-space.component';
import { ContactModule } from '../contact/contact.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MessageComponent,
     ConversationSpaceComponent
    ],
  imports: [
    CommonModule,
    ContactModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [
    MessageComponent,
    ConversationSpaceComponent
  ]
})
export class MessageModule { }
