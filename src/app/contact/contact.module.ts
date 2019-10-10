import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';

import { ContactComponent } from './contact/contact.component';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';


import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactComponent,
    ContactProfileComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  exports: [
    ContactsListComponent
  ]
})
export class ContactModule { }
