import { Component } from '@angular/core';

interface Passenger {
  id: number,
  fullname: string,
  checkedIn: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <h1>{{ title + "!" }}</h1>
      <!-- Below is equivalent to above -->
      <h1 [innerHTML]="title + '!'"></h1>
      <div>{{ numberOne + numberTwo }}</div>
      <div>
      {{ isHappy ? ':P' : ':(' }}
      </div>
      <p>Using property and event binding:</p>
      <input type="text" [value]="name" (input)="handleInput($event)" (blur)="handleBlur($event)">
      <p>Using ngModel and ngModelChange:</p>
      <input type="text" [ngModel]="name" (ngModelChange)="handleChange($event)">
      <p>Using ngModel 2-way binding</p>
      <input type="text" [(ngModel)]="name">
      <p>Template Ref:</p>
      <input type="text" #nameRef>
      <button type="button" (click)="handleRefClick(nameRef.value)">Update input</button>
      {{ name }}
      <br>
      <button type="button" (click)="handleClick()">Change name</button>
      <h2>Directives</h2>
      <input
        type="text"
        (input)="handleChange($event.target.value)">

      <div *ngIf="name.length">
        Searching for...{{name}}
      </div>
      <h2>Passengers</h2>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span class="status" [class.checked-in]="passenger.checkedIn"></span>
          <span class="status" 
            [ngClass]="{
              'checked-in': passenger.checkedIn
          }">
          </span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>

    </div>
  `
})
export class AppComponent {
  title: string = "Cheese";
  numberOne: number = 1;
  numberTwo: number = 2;
  isHappy: boolean = true;
  name: string = "Fatin";
  searchTerm: string = "";
  passengers: Passenger[] = [
    {
      id: 2,
      fullname: "Cheee",
      checkedIn: true
    },
    {
      id: 1,
      fullname: "Kurd Cheee",
      checkedIn: false
    },
    {
      id: 3,
      fullname: "Mccc",
      checkedIn: true
    },    
  ];

  handleInput(event: any) {
    this.name = event.target.value;
    console.log("input event fired");
  }

  handleBlur(event: any) {
    console.log("blur event fired.");
    this.name = event.target.value;
  }

  handleClick() {
    this.name = "Cheese";
  }

  handleChange(value: string) {
    this.name = value;
  }

  handleRefClick(value: string) {
    this.name = value;
  }

}
