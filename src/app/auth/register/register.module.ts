import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegisterComponent } from './user-register/user-register.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ 
    UserRegisterComponent 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    UserRegisterComponent
  ]
})
export class RegisterModule { 
}
