import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null),
      password: new FormControl(null)
    });
  }

  submit() {
    // on server

    //if succ
    this.router.navigateByUrl('/profile');
  }
}
