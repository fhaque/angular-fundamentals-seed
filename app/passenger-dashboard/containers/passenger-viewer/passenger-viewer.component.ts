import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';

import { PassengerDashboardService } from "../../passenger-dashboard.service";

import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: `
    <div>
      <button type="button" (click)="goBack()">
        &lsaquo; Go Back
      </button>
      <passenger-form
      [detail]="passenger"
      (update)="onUpdatePassenger($event)">
      </passenger-form>
    </div>
  `
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerDashboardService: PassengerDashboardService
  ) {}
  
  ngOnInit() {
    this.route.params
      .switchMap( (params: Passenger) => 
        this.passengerDashboardService.getPassenger(params.id)
      )
      .subscribe( (passenger: Passenger) => this.passenger = passenger);
  }

  onUpdatePassenger(passenger: Passenger) {
    this.passengerDashboardService
      .updatePassenger(passenger)
      .subscribe( (res: Passenger) => {
        this.passenger = {...res};
      });
  }

  goBack() {
    this.router.navigate(['/passengers']);
  }
}