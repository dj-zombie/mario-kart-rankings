import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <nav>
      <a routerLink="rankings" routerLinkActive="active">Rankings</a>
      <a routerLink="about" routerLinkActive="active">About</a>
    </nav>
  `,
})
export class AppComponent {}
