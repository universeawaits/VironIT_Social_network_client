import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ContactComponent } from './contact/contact/contact.component';
import { UserRegisterComponent } from './auth/register/user-register/user-register.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MessageComponent } from './message/message/message.component';
import { EmptyComponent } from './navigation/empty/empty.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'contact', component: ContactComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: AuthComponent },
  { path: 'message', component: MessageComponent, canActivate: [ AuthGuard ] },
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
