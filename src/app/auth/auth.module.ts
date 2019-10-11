import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterModule } from './register/register.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RegisterModule, // needed?
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AuthModule { }
