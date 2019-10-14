import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/user.profile';
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/server/auth.service';
import { Router } from '@angular/router';

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

  private editForm: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', [ 
        Validators.required, 
        Validators.pattern("^[a-zA-Z]+$"),
        Validators.minLength(3) ]),
      password: new FormControl('')
    });

    this.authService.getUserData().subscribe(
      user => {
        this.user = user;
        this.user.avatarSrc = this.avatarsFolderSrc + 'tommdddddddddddddy.example@gmail.com' + '.jpg';

        this.editForm.get('name').setValue(this.user.name);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem("jwt:token");
        this.router.navigateByUrl('login');
      }
    );
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
    if (passwordControl) {
      //for password just send request to the server and email user
    }
  }

  cancelEdit() {
    this.mode = (this.mode === 'view') ? 'edit' : 'view';
    this.changeModeIcon = (this.mode === 'view') ? 'edit' : 'done';

    this.editForm.get('name').setValue(this.user.name);
    this.editForm.get('password').setValue(null);
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