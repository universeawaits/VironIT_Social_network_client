import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  private registerForm: FormGroup;
  @ViewChild('password', {static: false}) passwordField: ElementRef;

  constructor() { }

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
        // add validators same as on server
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
  }

}
