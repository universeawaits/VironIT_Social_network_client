import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ContactComponent } from './contact/contact/contact.component';
import { UserRegisterComponent } from './auth/register/user-register/user-register.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'contacts', component: ContactComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
