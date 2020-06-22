import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="app-container">
      <div class="main">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {}
