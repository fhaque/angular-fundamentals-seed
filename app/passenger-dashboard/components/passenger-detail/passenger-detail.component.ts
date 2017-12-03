import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
        <div>
            <span 
            class="status"
            [class.checked-in]="detail.checkedIn"></span>
            
            <div *ngIf="editing">
                <input 
                    #name
                    type="text" 
                    [value]="detail.fullname"
                    (input)="onNameChange(name.value)">
            </div>
            <div *ngIf="!editing">{{ detail.fullname }}</div>
            <div class="date">
            Check in date: 
            {{ 
                detail.checkInDate ? 
                (detail.checkInDate | date: 'yMMMMd' | uppercase) 
                : 
                'Not checked in' 
            }}
            </div>
            <button type="button" (click)="toggleEditing()">
                {{editing ? 'Done' : 'Edit'}}
            </button>
            <button type="button" (click)="onRemove()">
                Remove
            </button>
        </div>
    `
})
export class PassengerDetailComponent implements OnChanges {
    @Input()    detail: Passenger;
    @Output()   remove: EventEmitter<any> = new EventEmitter<any>();
    @Output()   edit: EventEmitter<any> = new EventEmitter<any>();

    editing: boolean = false;

    ngOnChanges(changes) {
        if (changes.detail) {
            this.detail = {...changes.detail.currentValue as Passenger};
        }
    }

    onNameChange(name: string) {
        this.detail.fullname = name;
    }

    toggleEditing() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }

        this.editing = !this.editing;
    }

    onRemove() {
        this.remove.emit(this.detail);
    }
}