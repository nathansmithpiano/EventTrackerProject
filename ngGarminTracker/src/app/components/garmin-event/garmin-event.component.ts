import { GarminService } from './../../services/garmin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarminEvent } from 'src/app/models/garmin-event';

@Component({
  selector: 'garmin-event',
  templateUrl: './garmin-event.component.html',
  styleUrls: ['./garmin-event.component.css'],
})
export class GarminEventComponent implements OnInit {
  constructor(
    private gSvc: GarminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  event: GarminEvent = new GarminEvent();
  updateEvent: GarminEvent = new GarminEvent();

  // "view" mode by default
  mode: string = "view";

  // called automatically when component is initialized
  ngOnInit(): void {
    let eventId: number | null = this.verifyParam();
    if (eventId) {
      this.show(eventId);
    }
  }

  // verify and return valid id as integer or null if invalid
  private verifyParam = (): number | null => {
    // get param 'id' from route as string (null if param empty)
    let paramString: string | null = this.route.snapshot.paramMap.get('id');
    if (paramString) {
      // reroute to not found if parameter is not an int above 0
      if (
        isNaN(parseInt(paramString)) ||
        parseInt(paramString).toString() != paramString ||
        parseFloat(paramString) != parseInt(paramString) ||
        parseInt(paramString) <= 0
      ) {
        console.error('invalid parameter: ' + paramString);
      } else {
        // return valid id
        let paramId: number = parseInt(paramString);
        return paramId;
      }
    }
    // if param is invalid, redirect to not found and return null
    this.router.navigateByUrl('/event-not-found/' + paramString);
    return null;
  };

  // attempt to obtain event by id from API
  private show = (id: Number): void => {
    this.gSvc.show(id).subscribe(
      (data) => {
        this.event = data;
      },
      (err) => {
        // redirect to not found if service throws error
        console.error('GarminEventComponent show() says: ' + err);
        this.router.navigateByUrl('/not-found/event/' + id);
      }
    );
  };

  // reset when editing
  updateReset = (): void => {
    this.updateEvent = JSON.parse(JSON.stringify(this.event));
  }

  // attempt to update event and return to 'view' mode
  update = (): void => {
    if (this.updateEvent && this.updateEvent.id) {
      this.gSvc.update(this.updateEvent).subscribe(
        (data) => {
          if (this.updateEvent.id) {
            // show updated event in 'view' mode and reset updateEvent
            this.show(this.updateEvent.id);
            this.updateEvent = new GarminEvent();
            this.mode = 'view';
          }
        },
        (err) => {
          console.error('GarminEventComponent update() says: ' + err);
        }
      )
    }
    console.log('update');
  }

  // attempt to delete and confirmation page
  delete = (): void => {
    this.gSvc.destroy(this.event).subscribe(
      (data) => {
        // show confirmation page in 'delete-after' mode and reset event
        this.allReset();
        this.mode = 'delete-after';
      },
      (err) => {
        console.error('GarminEventComponent delete() says: ' + err);
      }
    )
  }

  private allReset = (): void => {
    this.event = new GarminEvent();
    this.updateEvent = new GarminEvent();
  }

}
