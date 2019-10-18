import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from 'src/app/model/user.profile';
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/server/auth.service';
import { Router } from '@angular/router';
import { ImageService, Image } from 'src/app/services/server/image.service';
import { UserService } from 'src/app/services/server/user.service';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  mode: string = 'view';
  changeModeIcon: string = 'edit';

  private avatarSrc: string;
  private avatarsSrc = 'https://localhost:44345/images/avatars/large/';
  private user: UserProfile = new UserProfile();

  private editForm: FormGroup;
  private selectedFile: Image; 

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private imageService: ImageService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', [ 
        Validators.required, 
        Validators.pattern("^[a-zA-Z]+$"),
        Validators.minLength(3) 
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(8)
      ])
    });

    this.authService.getUserData().subscribe(
      user => {
        this.user = user;
        if (!this.user.avatar) {
          this.user.avatar = 'assets/images/avatars/large/account.jpg'
        }
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

    this.userService.updateData({ Name: nameControl.value, Password: passwordControl.value })
      .subscribe(
        () => {
          this.openSnackBar("changes saved", 3);
        }
    );
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

  processFile(imageInput: any) {
    if (this.mode == 'view') {
      return;
    }

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new Image(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        () => { },
        response => {
          this.selectedFile.link = '';
          this.openSnackBar(response.error, 4);
        },
        () => {
          this.openSnackBar('wait a bit & reload to see new avatar', 4);
        })
    });

    reader.readAsDataURL(file);
  }
}