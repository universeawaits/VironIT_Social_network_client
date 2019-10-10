import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { UserProfile } from 'src/app/model/user.profile';

@Component({
  selector: 'contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
  @Input() private contact: Contact = new Contact();

  constructor() { }

  ngOnInit() {
    this.contact.user = new UserProfile();
    this.contact.user.name = "Pasha";
    this.contact.user.email = "loh.pidar@roar.by";
    this.contact.user.phone = "+123 (24) 44 55 375";
    this.contact.user.registered = "4 Apr '14";
    this.contact.user.avatarSrc = 'assets/avatars/contacts/contact.jpg';
    this.contact.isBlocked = false;
    this.contact.isOnline = true;
    this.contact.isContact = true;
    this.contact.lastSeen = "";
  }

}
