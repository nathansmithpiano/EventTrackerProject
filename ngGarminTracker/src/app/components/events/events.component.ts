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

  events: GarminEvent[] = [];
  newEvent: GarminEvent = new GarminEvent();
  updateEvent: GarminEvent = new GarminEvent();
  isLoading: boolean = false;

  ngOnInit(): void {
    this.reload();
  }

  create = (): void => {
    if (this.eventIsValid())
    this.gSvc.create(this.newEvent).subscribe(
      (data) => {
        console.log(data);
        this.reload();
        this.newEvent = new GarminEvent();
      },
      (err) => {
        console.error('GarminEventsComponent show(): ' + err);
      }
    );
  };

  // verify valid event before creating
  eventIsValid = (): boolean => {
    let isValid:boolean = false;

    if (this.newEvent.type) {
      isValid = true;
    } else {
      isValid = false;
    }

    return isValid;
  };

  // when a row is clicked, redirect to the events/{id} page
  show = (id: Number | null):void => {
    if (id) {
      this.router.navigateByUrl('/events/' + id);
    } else {
      console.error('GarminEventsComponent show() says: id is null, ' + id);
    }
  };

  // attempt to obtain all from API
  reload = (): void => {
    this.isLoading = true;
    this.gSvc.index().subscribe(
      (data) => {
        this.events = data;
        this.isLoading = false;
      },
      (err) => {
        console.error('GarminEventsComponent index() says: ' + err);
      }
    );
  };
}
