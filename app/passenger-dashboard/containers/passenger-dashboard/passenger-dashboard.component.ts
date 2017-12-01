import { Component } from "@angular/core";
import { Passenger } from '../../models/passenger.interface';
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { PassengerDashboardService } from "../../passenger-dashboard.service";

@Component({
    selector: 'passenger-dashboard',
    styleUrls: ['passenger-dashboard.component.scss'],
    template: `
        <div>
            <passenger-count
                [items]="passengers">
            </passenger-count>
            <passenger-detail
                *ngFor="let passenger of passengers"
                [detail]="passenger"
                (edit)="handleEdit($event)"
                (remove)="handleRemove($event)"
            >
            </passenger-detail>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    passengers: Passenger[];

    constructor(
        private passengerService: PassengerDashboardService
    ) {}

    ngOnInit() {
        this.passengerService
            .getPassengers()
            .subscribe( 
                (passengers: Passenger[]) => this.passengers = passengers 
            ,
                (error: any) => console.log(error)
        );
    }

    handleEdit(item: Passenger) {
        this.passengerService
            .updatePassenger(item)
            .subscribe( (res: Passenger) => 
                this.passengers = this.passengers
                    .map( (passenger: Passenger) => (res.id === passenger.id) ?
                            {...item}
                            :
                            passenger
                    )
            );

    }

    handleRemove(item: Passenger) {
        this.passengerService
            .removePassenger(item)
            .subscribe( (res: boolean) => {
                console.log(res);
                this.passengers = this.passengers
                    .filter((passenger: Passenger) => item.id !== passenger.id)
            });

    }
}