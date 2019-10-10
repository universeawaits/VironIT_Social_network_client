import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/user.profile';
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  mode: string = 'view';
  changeModeIcon: string = 'edit';

  private avatarsFolderSrc = 'assets/avatars/';
  private user: UserProfile = new UserProfile();
  private password: string;

  private editForm: FormGroup;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user.name = 'Tommy';
    this.user.email = 'tommdddddddddddddy.example@gmail.com';
    this.user.phone = '+375 (33) 660 40 66';
    this.user.registered = "19 Jun \'19";
    this.user.avatarSrc = this.avatarsFolderSrc + this.user.email + '.jpg';

    this.password = '12345'; // get its value from the server
    this.editForm = new FormGroup({
      name: new FormControl(this.user.name, [ Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.maxLength(20), Validators.minLength(3) ]),
      password: new FormControl(this.password, [ Validators.required ])
    });
  }

  clearControl(controlName: string) {
    this.editForm.get(controlName).setValue('');
  }

  updateUser() {
    var nameControl = this.editForm.get('name');
    if (nameControl.valid) {
      this.user.name = nameControl.value;
    }

    var passwordControl = this.editForm.get('password');
    if (passwordControl.valid) {
      //for password just send request to the server and email user
    }
  }

  cancelEdit() {
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';

    this.editForm.get('name').setValue(this.user.name);
    this.editForm.get('password').setValue(this.password);
    this.openSnackBar("changes discarded", 3);
  }

  changeMode() {
    if (this.mode == 'edit') { // unnec?
      this.updateUser();
      this.openSnackBar("changes saved", 3);
    }
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';
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