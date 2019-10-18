import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/server/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('skies :: login');

    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  submit() {
    this.authService.login(
      this.loginForm.get('login').value, 
      this.loginForm.get('password').value
      ).subscribe(
        response =>
        {
          localStorage.setItem("jwt:token", response.token),
          localStorage.setItem("jwt:email", response.email)
          this.router.navigateByUrl('/profile');
        },
        response => 
        {
          this.openSnackBar(response.error, 5);
        }
      )
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
