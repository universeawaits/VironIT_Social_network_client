import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { UserProfile } from 'src/app/model/user.profile';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public contact: Contact;

  private actions: Action[] = [
    { icon: 'block', action: 'block' },
    { icon: 'edit', action: 'editPseudonym' },
    { icon: 'share', action: 'share' }
  ];

  constructor(
    private contactListProfileBindingService: ContactListProfileBindingService,
    private snackBar: MatSnackBar) {
    this.contactSubscription = this.contactListProfileBindingService.getContact()
      .subscribe(contact => this.contact = contact)
   }

  ngOnInit() { }

  changeIsBlockedStatus() {
    this.contact.isBlocked = !this.contact.isBlocked;
    if (this.contact.isBlocked) {
      this.contact.isContact = false;      
    }
    this.openSnackBar(this.contact.isBlocked ? 'contact blocked' : 'contact unblocked', 4);
  }

  share() {

  }

  editPseudonym(newPseudo: string) {

  }

  changeIsContactStatus() {
    this.contact.isContact = !this.contact.isContact;
    this.openSnackBar(this.contact.isContact ? 'contact added' : 'contact removed', 4);
  }

  viewName() {
    return this.contact.pseudonym ? this.contact.pseudonym : this.contact.user.name;
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'ok', {
      duration: duration * 1000,
      panelClass: [ 'snack-success' ],
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }
}
