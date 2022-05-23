import { GarminService } from './../../services/garmin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarminEvent } from 'src/app/models/garmin-event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'garmin-event',
  templateUrl: './garmin-event.component.html',
  styleUrls: ['./garmin-event.component.css'],
})
export class GarminEventComponent implements OnInit {
  constructor(
    private gSvc: GarminService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  event: GarminEvent = new GarminEvent();
  backup: GarminEvent = new GarminEvent();
  eventDate: string | null = '';
  timeOfDay: string | null = '';
  isLoading: boolean = false;
  invalid: boolean = false;
  validationMessages: string[] = [];

  disabled = true; //disabling inputs on view only
  mode: string = 'view'; // 'view' mode by default

  // called automatically when component is initialized
  ngOnInit(): void {
    let eventId: number | null = this.verifyParam();
    if (eventId) {
      this.show(eventId);
    }
  }

  private setEventDate = (setting: string): void => {
    if (setting === 'event') {
      if (this.event.date) {
        let date: Date = new Date(Date.parse(this.event.date));
        this.eventDate = this.datePipe.transform(this.event.date, 'yyyy-MM-dd');
        this.timeOfDay = this.datePipe.transform(this.event.date, 'hh:mm:ss a');
      }
    }
  }

  // verify and return valid id as integer or null if invalid
  private verifyParam = (): number | null => {

    // get param 'id' from route as string (null if param empty)
    let paramString: string | null = this.route.snapshot.paramMap.get('id');
    if (paramString) {
      // re-route if 'create' mode
      if (paramString === 'create') {
        this.beginCreate();
        return null;
      } else if (
        // reroute to not found if parameter is not an int above 0
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
  private show = (id: number): void => {
    this.toggleLoading();
    this.gSvc.show(id).subscribe(
      (data) => {
        this.event = data;
        this.setEventDate('event');
        this.toggleLoading();
      },
      (err) => {
        this.toggleLoading();
        // redirect to not found if service throws error
        console.error('GarminEventComponent show() says: ' + err);
        this.router.navigateByUrl('/not-found/event/' + id);
      }
    );
  };

  create = (): void => {
    if (this.validateInput()) {
      this.gSvc.create(this.event).subscribe(
        (data) => {
          this.allReset();
          if (data.id) {
            this.show(data.id);
          }
        },
        (err) => {
          console.error('GarminEventsComponent show(): ' + err);
        }
      );
    }
  };

  // attempt to update event and return to 'view' mode
  update = (): void => {
    if (this.validateInput()) {
      if (this.event && this.event.id) {
        this.toggleLoading();
        this.gSvc.update(this.event).subscribe(
          (data) => {
            if (this.event.id) {
              // show updated event in 'view' mode and reset updateEvent
              this.show(this.event.id);
              this.allReset();
              this.toggleLoading();
            }
          },
          (err) => {
            this.toggleLoading();
            console.error('GarminEventComponent update() says: ' + err);
          }
        )
      }
    }
  }

  // attempt to delete and confirmation page
  delete = (): void => {
    this.toggleLoading();
    this.gSvc.destroy(this.event).subscribe(
      (data) => {
        // after deleting, reset all and send back to table
        this.allReset();
        this.toggleLoading();
        this.router.navigateByUrl('/events');
      },
      (err) => {
        this.toggleLoading();
        console.error('GarminEventComponent delete() says: ' + err);
      }
    )
  }

  beginCreate = (): void => {
    this.allReset();
    this.mode = 'create';
    this.disabled = false;
  }

  beginEdit = (): void => {
    this.disabled = false;
    this.mode = 'edit';
    // copy event as backup via JSON (deep copy)
    this.backup = JSON.parse(JSON.stringify(this.event));
    this.updateReset()
  }

  // reset when editing
  updateReset = (): void => {
    this.setEventDate('event');
    // restore event from backup via JSON (deep copy)
    this.event = JSON.parse(JSON.stringify(this.backup));
  }

  // reset everything
  private allReset = (): void => {
    this.setEventDate('event');
    this.mode = 'view';
    this.disabled = true;
    this.event = new GarminEvent();
    this.backup = new GarminEvent();
  }

  private toggleLoading = (): void => {
    if (this.isLoading) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
  }

  // validate input
  private validateInput = (): boolean => {
    // verify date is not null
    this.invalid = false;
    this.validationMessages = [];

    // verify date picker is not empty
    if (!this.eventDate) {
      this.invalid = true;
      this.addMessage('Date is required');
    }

    // verify Time of Day is not empty
    if (!this.timeOfDay) {
      this.invalid = true;
      this.addMessage('Time of Day is required');
    } else {
      // verify time is in correct format
      // should be in format: 01:02:03 PM
      let regex = new RegExp('^([0-1]{1}[0-2]{1}|[0]{1}[0-9]{1}):[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}[ ]{1}[A,P]{1}[M]{1}$');
      if (!regex.test(this.timeOfDay)) {
        this.invalid = true;
        this.addMessage('Time of Day must be in format: hh:mm:ss AM/PM (including leading zeros)');
      } else {
        // convert to 2022-04-03T15:12:06
        let newDate = this.datePipe.transform(this.eventDate, 'y-MM-dd');
        let newTOD = this.timeOfDay;
        if (!newDate) {
          this.invalid = true;
          this.addMessage('ERROR converting Date');
        } else {
          // convert to military time
          let arr = newTOD.split(' ');
          if (!arr || arr.length != 2) {
            this.invalid = true;
            this.addMessage('ERROR converting Time Of Day');
          } else {
            if (arr[1] === 'PM') {
              let arr2 = arr[0].split(':');
              if (parseInt(arr2[0]) < 12) {
                // convert hours to military time
                arr2[0] = (parseInt(arr2[0]) + 12).toString();
              }
              newTOD = arr2[0] + ':' + arr2[1] + ':' + arr2[2] + ' PM';
            }
          }
        }
        if (newTOD.includes('M')) {
          // remove AM/PM at end
          newTOD = newTOD.slice(0, newTOD.indexOf('M') - 1);
          this.event.date = newDate + 'T' + newTOD;
        } else {
          this.event.date = newDate + 'T' + newTOD;
        }
      }
    }

    // verify time
    if (!this.event.time) {
      this.invalid = true;
      this.addMessage('Time is required');
    } else {
      let regex = new RegExp('^[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$');
      if (!regex.test(this.event.time)) {
        this.invalid = true;
        this.addMessage('Time must be in format: hh:mm:ss (including leading zeros)');
      }
    }

    // verify type
    if (!this.event.type) {
      this.invalid = true;
      this.addMessage('Type is required');
    }

    // verify title
    if (!this.event.title) {
      this.invalid = true;
      this.addMessage('Title is required');
    }

    // verify moving time (can be null)
    if (this.event.timeMoving && !this.validateTime(this.event.timeMoving.toString())) {
      this.invalid = true;
      this.addMessage('Time Moving must be in format: hh:mm:ss (including leading zeros)');
    }

    // verify elapsed time (can be null)
    if (this.event.timeElapsed && !this.validateTime(this.event.timeElapsed.toString())) {
      this.invalid = true;
      this.addMessage('Time Elapsed must be in format: hh:mm:ss (including leading zeros)');
    }

    // verify average pace (can be null)
    if (this.event.paceAvg && !this.validateTime(this.event.paceAvg.toString())) {
      this.invalid = true;
      this.addMessage('Average Pace must be in format: hh:mm:ss (including leading zeros)');
    }

    // verify distance (can be null, can be decimal
    if (this.event.distance && this.event.distance < 0) {
      this.invalid = true;
      this.addMessage('Distance must be greater than zero');
    }

    // verify integer fields if not empty
    this.validatePosInt(this.event.calories, 'Calories');
    this.validatePosInt(this.event.hrAvg, 'Average HR');
    this.validatePosInt(this.event.hrMax, 'Max HR');
    this.validatePosInt(this.event.ascent, 'Ascent');
    this.validatePosInt(this.event.descent, 'Descent');
    this.validatePosInt(this.event.elevationMin, 'Elevation (min)');
    this.validatePosInt(this.event.elevationMax, 'Elevation (max)');
    this.validatePosInt(this.event.aerobicTe, 'Aerobic TE');
    this.validatePosInt(this.event.runCadenceAvg, 'Run Cadence (avg)');
    this.validatePosInt(this.event.runCadenceMax, 'Run Cadence (max)');

    return !this.invalid;
  }

  private validatePosInt = (num: number | null, str: string): void => {
    if (num && num < 0) {
      this.invalid = true;
      this.addMessage(str + ' must be greater than zero');
    } else if (num?.toString().includes('.')) {
      this.invalid = true;
      this.addMessage(str + ' must be a whole number (no decimals)');
    }
  }

  private validateTime = (str: string): boolean => {
    let regex = new RegExp('^([2]{1}[0-3]{1}|[0-1]{1}[0-9]{1}):[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$');
    return regex.test(str);
  }

  // add message and prevent duplicates
  private addMessage = (message: string): void => {
    let hasMatch: boolean = false;
    for (let msg of this.validationMessages) {
      if (msg === message) {
        hasMatch = true;
      }
    }
    if (!hasMatch) {
      this.validationMessages.push(message);
    }
  }

}
