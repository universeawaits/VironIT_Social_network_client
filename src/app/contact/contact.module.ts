import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactComponent } from './contact/contact.component';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';


import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './search/search.component';
import { ShareContactDialogComponent } from './share-contact-dialog/share-contact-dialog.component';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactComponent,
    ContactProfileComponent,
    SearchComponent,
    ShareContactDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
