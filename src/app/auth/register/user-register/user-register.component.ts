import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/server/user.service';
import { Title } from '@angular/platform-browser';
import { SnackbarService } from 'src/app/services/component/snackbar.service';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  @ViewChild('password', { static: false }) passwordField: ElementRef;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.titleService.setTitle('skies :: register');

    this.registerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+$"),
        Validators.minLength(3) ]),
      email: new FormControl(null, [ 
        Validators.required,
        Validators.email ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(12),
        Validators.maxLength(12)
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(8)
      ])
    });
  }

  clearControl(controlName: string) {
    this.registerForm.get(controlName).setValue('');
  }

  changePasswordFieldType() {
    this.passwordField.nativeElement.type = 
      this.passwordField.nativeElement.type == 'password' ? 'text' : 'password';
  }

  submit() {
    this.userService.register({ 
      Username: this.registerForm.get('name').value,
      Email: this.registerForm.get('email').value,
      Phone: this.registerForm.get('phone').value,
      Password: this.registerForm.get('password').value
    }).subscribe(
      () => {
        this.snackbarService.open("check you email", true);
        this.router.navigateByUrl('/login');
      },
      response => {
        this.snackbarService.open(response.error, false);
      }
    );
  }
}
