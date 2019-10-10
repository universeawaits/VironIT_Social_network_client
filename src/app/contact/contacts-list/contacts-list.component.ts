import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  private contactsAvatarsSrc = 'assets/avatars/contacts/';
  private contacts: Contact[] = [
    {
      pseudonym: '', isOnline: true, isBlocked: false, isContact: true, lastSeen: '7 Oct \'19', 
      user: { name: 'Anna', registered: '16 Jun \'19', phone: '+375 (44) 23 56 847', email: 'anna.doe@gmail.com', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: false, isContact: false, lastSeen: '4 Sep \'19', 
      user: { name: 'Andrew', registered: '21 Jul \'19', phone: '+375 (25) 26 58 999', email: 'loh.kek@gmail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'lohpidr', isOnline: true, isBlocked: true, isContact: false, lastSeen: '19 Sep \'19', 
      user: { name: 'Iona', registered: '29 Aug \'18', phone: '+375 (29) 78 68 797', email: 'iona.loren@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: false, isContact: true, lastSeen: '19 Sep \'19', 
      user: { name: 'George', registered: '5 Mar \'13', phone: '+375 (29) 34 88 123', email: 'george.morge@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'gay', isOnline: false, isBlocked: false, isContact: true, lastSeen: '24 Mar \'17', 
      user: { name: 'Pavel', registered: '6 Nov \'17', phone: '+375 (44) 25 59 243', email: 'pavel.shapavel@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: true, isContact: false, lastSeen: '19 Sep \'16', 
      user: { name: 'Tina', registered: '23 Oct \'15', phone: '+375 (33) 38 27 154', email: 'tina.skotina@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'rabbit', isOnline: true, isBlocked: false, isContact: false, lastSeen: '19 Nov \'19', 
      user: { name: 'Lora', registered: '14 Oct \'19', phone: '+375 (25) 98 12 836', email: 'lora.lora@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: 'babe', isOnline: true, isBlocked: false, isContact: true, lastSeen: '19 Sep \'19', 
      user: { name: 'Mary', registered: '15 Jan \'19', phone: '+375 (29) 67 54 345', email: 'mary.dura@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }, {
      pseudonym: '', isOnline: false, isBlocked: false, isContact: false, lastSeen: '22 Sep \'19', 
      user: { name: 'Max', registered: '8 Aug \'18', phone: '+375 (33) 25 87 256', email: 'max.loh@mail.ru', avatarSrc: this.contactsAvatarsSrc + '/contact.jpg'}
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
