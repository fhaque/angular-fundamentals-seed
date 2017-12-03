import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";


@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form #form="ngForm" (ngSubmit)="handleSubmit(form.value, form.valid)" novalidate>
      {{ detail | json }}
      <div>
        Passenger Name:
        <input 
          type="text"
          name="fullname"
          #fullname="ngModel"
          [ngModel]="detail?.fullname"
          required>
          <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
            Passenger name required.
          </div>
        </div>
      <div>
        Passenger ID:
        <input 
          type="number"
          name="id"
          #id="ngModel"
          [ngModel]="detail?.id"
          required>
      </div>
      <div *ngIf="id.errors?.required && id.dirty" class="error">
        Passenger ID required.
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckedIn($event)">
          Checked In
        </label>
      <!--
        <label>
          <input
            type="radio"
            [value]="true"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckedIn($event)">
          Yes
        </label>
        <label>
          <input
            type="radio"
            [value]="false"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckedIn($event)">
          No
        </label>
        -->
      </div>
      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate">
      </div>
      <div>
      Luggage: 
      <select
        name="baggage"
        [ngModel]="detail?.baggage">
        <option
          *ngFor="let item of baggage"
          [selected]="detail?.baggage === item.key"
          [value]="item.key">
          {{ item.value }}
        </option>
        <!--
        <option
          *ngFor="let item of baggage"
          [ngValue]="item.key">
          {{ item.value }}
        </option>
        -->
      </select>
      </div>
      <button 
        type="submit"
        [disabled]="form.invalid">
        Update passenger
      </button>
    </form>
    <div>Form Data: {{ form.value | json }}</div>
    <div>Form Valid: {{ form.valid | json }}</div>
    <div>Form Invalid: {{ form.invalid | json }}</div>

  `
})
export class PassengerFormComponent {
  @Input() detail: Passenger;
  @Output() update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: 'none',
      value: 'No baggage',
    },
    {
      key: 'hand-only',
      value: 'Hand baggage',
    },
    {
      key: 'hold-only',
      value: 'Hold baggage',
    },
    {
      key: 'hand-hold',
      value: 'Hand and hold baggage',
    },
  ];

  toggleCheckedIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}