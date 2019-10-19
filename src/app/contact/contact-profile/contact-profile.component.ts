import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/model/user.profile';
import { ContactListSearchBindingService } from 'src/app/services/component/contact-list-search-binding.service';
import { ContactService } from 'src/app/services/server/contact.service';

@Component({
  selector: 'contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
  private contactSubscription: Subscription;
  private searchModeSubscription: Subscription;
  public contact: Contact;

  private mode: string = 'view';
  private changeModeIcon: string = 'edit';

  private editForm: FormGroup;

  constructor(
    private contactListProfileBindingService: ContactListProfileBindingService,
    private contactListSearchBindingService: ContactListSearchBindingService,
    private contactService: ContactService,
    private snackBar: MatSnackBar
    ) {    
      this.contactSubscription = this.contactListProfileBindingService.getContact()
        .subscribe(
          contact => {
            this.contact = contact;
            this.editForm.get('pseudonym').setValue(this.contact.pseudonym); // needed?
            if (this.mode == 'edit') {
              this.cancelEdit();
            }
        });
      this.searchModeSubscription = this.contactListSearchBindingService.getSearchString()
        .subscribe(
          searchString => {
            if (searchString.trim()) {
              this.mode = 'search';
              this.contact = null;
            } else {
              this.mode = 'view';
            }
          });
   }

  ngOnInit() {
    this.contact = new Contact();
    this.contact.user = new UserProfile();

    this.editForm = new FormGroup({
      pseudonym: new FormControl(this.contact.pseudonym ? this.contact.pseudonym : this.contact.user.name, [ 
        Validators.pattern("^[a-zA-Z]+$"),
        Validators.minLength(3) ]),
    });
    this.editForm.get('pseudonym').markAsUntouched();

    this.contact = null;
   }

  changeIsBlockedStatus() {
    if (this.contact.isBlocked) {
      this.contactService.unblock(this.contact.user.email).subscribe(
        () => {
          this.contact.isBlocked = false;
          this.openSnackBar('contact unblocked', 3);
        }
      );
    } else {
      this.contactService.block(this.contact.user.email).subscribe(
        () => {
          this.contactService.removeContact(this.contact.user.email).subscribe(
            () => {
              this.contact.isBlocked = true;
              this.contact.isContact = false;
              this.openSnackBar('contact blocked', 3);
            }
          )
        }
      );
    }
  }

  changeMode() {
    if (this.mode == 'edit') { // unnec?
      this.editPseudonym();
      this.openSnackBar("changes saved", 3);
    }
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';
  }

  cancelEdit() {
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';

    this.editForm.get('pseudonym').setValue(this.contact.pseudonym);
    this.openSnackBar("changes discarded", 3);
  }

  clearControl(controlName: string) {
    this.editForm.get(controlName).setValue('');
  }

  editPseudonym() {
    var pseudonymControl = this.editForm.get('pseudonym');
    if (pseudonymControl.valid) {
      this.contactService.changePseudonym(this.contact.user.email, pseudonymControl.value)
        .subscribe(
          () => {
            this.contact.pseudonym = pseudonymControl.value;
          }
      );
    }
  }

  share() {

  }

  changeIsContactStatus() {
    if (this.contact.isContact) {
      this.contactService.removeContact(this.contact.user.email).subscribe(
        () => {
          this.contact.isContact = false;
          this.openSnackBar('contact removed', 3);
        }
      );
    } else {
      this.contactService.addContact(this.contact.user.email).subscribe(
        () => {
          this.contact.isContact = true;
          this.openSnackBar('contact added', 3);
        }
      );
    }
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
