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

  event: GarminEvent | null = null;

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

  // attempt to obtain event from API
  private show = (id: number): void => {
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
}
