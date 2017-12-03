import { Component } from '@angular/core';

export interface Nav {
  link: string,
  name: string,
  exact: boolean,
}


@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <nav class="nav">
        <a 
          *ngFor="let link of nav"
          [routerLink]="link.link"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: link.exact }">
          {{ link.name }}
        </a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true,  
    },
    {
      link: '/passengers',
      name: 'Passengers',
      exact: true,  
    },
    {
      link: '/oops',
      name: '404 Test',
      exact: false,
    }
  ];
}