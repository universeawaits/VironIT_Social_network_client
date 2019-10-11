import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactListProfileBindingService } from 'src/app/services/component/contact-list-profile-binding.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/model/user.profile';

@Component({
  selector: 'contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit {
  private contactSubscription: Subscription;
  public contact: Contact;

  private mode: string = 'view';
  private changeModeIcon: string = 'edit';

  private editForm: FormGroup;

  constructor(
    private contactListProfileBindingService: ContactListProfileBindingService,
    private snackBar: MatSnackBar) {    
      this.contactSubscription = this.contactListProfileBindingService.getContact()
        .subscribe(
          contact => {
            this.contact = contact;
            this.editForm.get('pseudonym').setValue(this.contact.pseudonym); // needed?
            if (this.mode == 'edit') {
              this.cancelEdit();
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
    this.contact.isBlocked = !this.contact.isBlocked;
    if (this.contact.isBlocked) {
      this.contact.isContact = false;      
    }
    this.openSnackBar(this.contact.isBlocked ? 'contact blocked' : 'contact unblocked', 3);
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
      this.contact.pseudonym = pseudonymControl.value;
    }
  }

  share() {

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
