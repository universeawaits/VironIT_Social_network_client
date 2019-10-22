import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/model/user.profile';
import { ContactListSearchBindingService } from 'src/app/services/component/contact-list-search-binding.service';
import { ContactService } from 'src/app/services/server/contact.service';
import { SnackbarService } from 'src/app/services/component/snackbar.service';
import { ShareContactMessageBindingService } from 'src/app/services/component/share-contact-message-binding.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ShareContactDialogComponent } from '../share-contact-dialog/share-contact-dialog.component';
import { ShareContactProfileBindingService } from 'src/app/services/component/share-contact-profile-binding.service';

@Component({
  selector: 'contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
  private contactSubscription: Subscription;
  private searchModeSubscription: Subscription;
  public contact: Contact;

  mode: string = 'view';
  changeModeIcon: string = 'edit';

  editForm: FormGroup;

  constructor(
    private contactListProfileBindingService: ContactListProfileBindingService,
    private contactListSearchBindingService: ContactListSearchBindingService,
    private shareContactService: ShareContactMessageBindingService,
    private shareProfileBindingService: ShareContactProfileBindingService,
    private contactService: ContactService,
    private shareDialog: MatDialog,
    private snackbarService: SnackbarService
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
    
    this.shareProfileBindingService.contactLoaded.subscribe(
      contact => {
        console.log(contact.lastSeen)
        this.contact = contact;
      }
    )
   }

  changeIsBlockedStatus() {
    if (this.contact.isBlocked) {
      this.contactService.unblock(this.contact.user.email).subscribe(
        () => {
          this.contact.isBlocked = false;
          this.snackbarService.open('contact unblocked', true);
        }
      );
    } else {
      this.contactService.block(this.contact.user.email).subscribe(
        () => {
          this.contactService.changeContactStatus(this.contact.user.email).subscribe(
            () => {
              this.contact.isBlocked = true;
              this.contact.isContact = false;
              this.snackbarService.open('contact blocked', true);
            }
          )
        }
      );
    }
  }

  changeMode() {
    if (this.mode == 'edit') { // unnec?
      this.editPseudonym();
      this.snackbarService.open("changes saved", true);
    }
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';
  }

  cancelEdit() {
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';

    this.editForm.get('pseudonym').setValue(this.contact.pseudonym);
    this.snackbarService.open("changes discarded", true);
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

  openShareDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.restoreFocus = false;
    dialogConfig.panelClass = 'share-contact-container';

    this.shareContactService.setContactToShare(this.contact);
    this.shareDialog.open(ShareContactDialogComponent, dialogConfig);
  }

  changeIsContactStatus() {
    this.contactService.changeContactStatus(this.contact.user.email).subscribe(
      () => {
        this.contact.isContact = !this.contact.isContact;
        this.snackbarService.open('contact ' + (this.contact.isContact ? 'added' : 'removed'), true);
      }
    );    
  }

  viewName() {
    return this.contact.pseudonym ? this.contact.pseudonym : this.contact.user.name;
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
    this.searchModeSubscription.unsubscribe();

    this.shareDialog.closeAll();
  }
}
