import { Component, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { UserProfile } from 'src/app/model/user.profile';
import { Subscription } from 'rxjs';
import { ContactListSearchBindingService } from 'src/app/services/component/contact-list-search-binding.service';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  private contactsAvatarsSrc = 'assets/avatars/contacts/';
  
  private contactsSubscription: Subscription;
  private contacts: Contact[];
  private allContacts: Contact[] = [
    {
      pseudonym: '', isOnline: true, isBlocked: false, isContact: true, lastSeen: '7 Oct \'19', 
      user: { name: 'Annaqqqqqqqqqqqqqqqq', registered: '16 Jun \'19', phone: '375442356847', email: 'anna.doe@gmail.com', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: false, isContact: false, lastSeen: '4 Sep \'19', 
      user: { name: 'Andrew', registered: '21 Jul \'19', phone: '375252658999', email: 'loh.kek@gmail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'lohpidr', isOnline: true, isBlocked: true, isContact: false, lastSeen: '19 Sep \'19', 
      user: { name: 'Iona', registered: '29 Aug \'18', phone: '375297868797', email: 'iona.loren@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: false, isContact: true, lastSeen: '19 Sep \'19', 
      user: { name: 'George', registered: '5 Mar \'13', phone: '375293488123', email: 'george.morge@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'gay', isOnline: false, isBlocked: false, isContact: true, lastSeen: '24 Mar \'17', 
      user: { name: 'Pavel', registered: '6 Nov \'17', phone: '375442559243', email: 'pavel.shapavel@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: true, isContact: false, lastSeen: '19 Sep \'16', 
      user: { name: 'Tina', registered: '23 Oct \'15', phone: '375333827154', email: 'tina.skotina@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'rabbit', isOnline: true, isBlocked: false, isContact: false, lastSeen: '19 Nov \'19', 
      user: { name: 'Lora', registered: '14 Oct \'19', phone: '375259812836', email: 'lora.lora@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'babe', isOnline: true, isBlocked: false, isContact: true, lastSeen: '19 Sep \'19', 
      user: { name: 'Mary', registered: '15 Jan \'19', phone: '375296754345', email: 'mary.dura@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: false, isContact: false, lastSeen: '22 Sep \'19', 
      user: { name: 'Max', registered: '8 Aug \'18', phone: '375332587256', email: 'max.loh@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }
  ];

  constructor(
    private contactListProfileBindingService: ContactListProfileBindingService,
    private contactListSearchBindingService: ContactListSearchBindingService,
    ) { }

  ngOnInit() {
    this.contacts = this.allContacts.filter(contact => contact.isContact);
    this.contactsSubscription = this.contactListSearchBindingService.getContacts()
        .subscribe(
          emailOrPhone => {
            if (emailOrPhone && emailOrPhone.trim()) {
              this.contacts = this.allContacts.filter(
                contact => {
                  return (contact.user.email.startsWith(emailOrPhone) ||
                    contact.user.phone.startsWith(emailOrPhone));
                }
              );
            } else {
              this.contacts = this.allContacts.filter(contact => contact.isContact);
            }
        });
        console.log(this.allContacts.length == 0)
  }

  selectContact(contact: Contact) {
    this.contactListProfileBindingService.updateContact(contact);
  }

  viewName(contact: Contact) {
    return contact.pseudonym ? contact.pseudonym : contact.user.name;
  }
}
