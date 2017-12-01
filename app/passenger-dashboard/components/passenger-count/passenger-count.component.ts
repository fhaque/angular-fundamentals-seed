import { Component } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-count',
    template: `
        <div>
            <h3>Airline Passengers</h3>
            <div>
                Passengers Checked In: {{ checkedInCount() }} / {{ items?.length }};
            </div>
        </div>
    `
})
export class PassengerCountComponent {
    @Input() items: Passenger[];

    checkedInCount(): number {
        if (!this.items) return;
        return this.items.filter( (item: Passenger) => item.checkedIn ).length;
    }
}