import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Subscription } from 'rxjs';
import { ContactListSearchBindingService } from 'src/app/services/component/contact-list-search-binding.service';
import { ContactService } from 'src/app/services/server/contact.service';
import { SearchService } from 'src/app/services/server/search.service';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  private contactsAvatarsSrc = 'assets/images/avatars/medium';
  
  private contactsSubscription: Subscription;
  private contacts: Contact[] = [];

  constructor(
    private contactListProfileBindingService: ContactListProfileBindingService,
    private contactListSearchBindingService: ContactListSearchBindingService,
    private contactService: ContactService,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this.contactsSubscription = this.contactListSearchBindingService.getSearchString()
        .subscribe(
          emailOrPhone => {
            if (emailOrPhone.trim()) {
              this.searchService.getByPhoneOrEmail(emailOrPhone).subscribe(
                probContacts => {
                  probContacts.forEach(probContact => {
                    if (!probContact.user.avatar) {
                      probContact.user.avatar = this.contactsAvatarsSrc + '/account.jpg';
                    }
                  });
                  this.contacts = probContacts;
                }
              );
            } else {
              this.initContacts();
            }
        });
    this.initContacts();
  }

  initContacts() {
    this.contactService.getAll().subscribe(
      contacts => {
        contacts.forEach(contact => {
          if (!contact.user.avatar) {
            contact.user.avatar = this.contactsAvatarsSrc + '/account.jpg';
          }
        });
        this.contacts = contacts;
      }
    );
  }

  selectContact(contact: Contact) {
    this.contactListProfileBindingService.updateContact(contact);
  }

  viewName(contact: Contact) {
    return contact.pseudonym ? contact.pseudonym : contact.user.name;
  }

  ngOnDestroy() {
    this.contactsSubscription.unsubscribe();
  }
}
