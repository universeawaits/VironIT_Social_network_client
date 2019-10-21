import { Component, OnInit, Input } from '@angular/core';

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
  actions: Action[] = [
    { path: 'profile', icon: 'person' },
    { path: 'messages', icon: 'message' },
    { path: 'contacts', icon: 'contacts' }
  ];

  constructor() { }

  ngOnInit() { }

}
