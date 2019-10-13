import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/server/user.service';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  private registerForm: FormGroup;
  @ViewChild('password', { static: false }) passwordField: ElementRef;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
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
    // on server
    this.userService.register({ 
      Username: this.registerForm.get('name').value,
      Email: this.registerForm.get('email').value,
      Phone: this.registerForm.get('phone').value,
      Password: this.registerForm.get('password').value
    }).subscribe(
      () => {
        this.openSnackBar("check you email", 7);
        this.router.navigateByUrl('/login');
      }
    );
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
