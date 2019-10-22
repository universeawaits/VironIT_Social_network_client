import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'skies';
  headerVisibility: boolean = false;
  route: string = '';

  constructor (
    private router: Router
    ) { }

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.route = this.router.url;
          this.headerVisibility = (this.route !== '/register' && this.route !== '/login');
        }
      }
    )
  }
}
