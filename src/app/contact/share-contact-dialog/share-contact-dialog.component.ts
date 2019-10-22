import { Component, OnInit } from '@angular/core';
import { ShareContactMessageBindingService } from 'src/app/services/component/share-contact-message-binding.service';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/services/server/contact.service';
import { SnackbarService } from 'src/app/services/component/snackbar.service';

@Component({
  selector: 'app-share-contact-dialog',
  templateUrl: './share-contact-dialog.component.html',
  styleUrls: ['./share-contact-dialog.component.scss']
})
export class ShareContactDialogComponent implements OnInit {
  contacts: Contact[];

  constructor(
    private shareContactService: ShareContactMessageBindingService,
    private contactService: ContactService,
    private snackbarService: SnackbarService
    ) { }

  ngOnInit() {
    this.contactService.getAll().subscribe(
      contacts => {
        this.contacts = contacts.filter(
          contact => contact.user.email !== 
            this.shareContactService.contactToShare.user.email
          );
      }
    )
  }

  share(contactToMessage: Contact) {
    this.shareContactService.share(contactToMessage);
    this.snackbarService.open(
      'contact shared with ' + contactToMessage.user.name,
      true
      );
  }
}
