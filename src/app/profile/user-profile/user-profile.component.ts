import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/user.profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private avatarsFolderSrc = 'assets/avatars/';
  private user: UserProfile = new UserProfile();

  constructor() { }

  ngOnInit() {
    this.user.name = 'Tommy';
    this.user.email = 'tommy.example@gmail.com';
    this.user.phone = '+375 (33) 660 40 66';
    this.user.registered = "19 Jun \'19";
    this.user.avatarSrc = this.avatarsFolderSrc + this.user.email + '.jpg';
  }
}
