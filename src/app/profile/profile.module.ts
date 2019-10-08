import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class ProfileModule { }
