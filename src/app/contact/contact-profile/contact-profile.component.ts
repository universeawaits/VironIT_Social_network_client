import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { UserProfile } from 'src/app/model/user.profile';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Observable, Subscription } from 'rxjs';

declare interface Action {
  icon: string;
  action: string;
}

@Component({
  selector: 'contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
  private contactSubscription: Subscription;
  public contact: Contact = new Contact();

  private actions: Action[] = [
    { icon: 'block', action: 'block' },
    { icon: 'edit', action: 'editPseudonym' },
    { icon: 'share', action: 'share' }
  ];

  constructor(private contactListProfileBindingService: ContactListProfileBindingService) {
    this.contactSubscription = this.contactListProfileBindingService.getContact()
      .subscribe(contact => this.contact = contact)
   }

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
    this.contact.lastSeen = "now";
  }

  block(email: string) {

  }

  share(email: string) {

  }

  editPseudonym(email: string, newPseudo: string) {

  }

  add(email: string) {

  }

  viewName() {
    return this.contact.pseudonym ? this.contact.pseudonym : this.contact.user.name;
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }
}
