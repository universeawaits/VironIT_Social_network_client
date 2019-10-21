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
    { path: 'message', icon: 'message' },
    { path: 'contact', icon: 'contacts' }
  ];

  constructor() { }

  ngOnInit() { }

}
