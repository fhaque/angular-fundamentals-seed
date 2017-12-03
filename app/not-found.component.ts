import { Component } from "@angular/core";

@Component({
  selector: 'not-found',
  template: `
    <div>
      <h2>404</h2>
      Not Found, <a routerLink="/">go home</a>?
    </div>
  `
})
export class NotFoundComponent {

}