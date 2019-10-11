import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ContactComponent } from './contact/contact/contact.component';
import { UserRegisterComponent } from './auth/register/register/user-register/user-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'register', component: UserRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
