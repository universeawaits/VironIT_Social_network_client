import { Component, OnInit } from '@angular/core';

interface Action {
  path: string;
  icon: string;
}

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private actions: Action[] = [
    { path: 'profile', icon: 'person_outline' },
    { path: 'messages', icon: 'mail_outline' },
    { path: 'contacts', icon: 'contacts' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
