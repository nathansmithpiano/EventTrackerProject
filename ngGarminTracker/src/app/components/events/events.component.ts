import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarminEvent } from 'src/app/models/garmin-event';
import { GarminService } from 'src/app/services/garmin.service';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  constructor(
    private gSvc: GarminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  newEvent: GarminEvent = new GarminEvent();

  ngOnInit(): void {}

  create = (): void => {
    if (this.eventIsValid())
    this.gSvc.create(this.newEvent).subscribe(
      (data) => {
        console.log(data);
        this.reload();
        this.newEvent = new GarminEvent();
      },
      (err) => {
        console.error('GarminEventComponent show(): ' + err);
      }
    );
  };

  eventIsValid = (): boolean => {
    if (this.newEvent.type) {
      return true;
    } else {
      return false;
    }
  };

  private reload = (): void => {

  };
}
