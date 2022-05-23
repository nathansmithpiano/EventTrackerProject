import { DatePipe } from '@angular/common';
import { GarminService } from 'src/app/services/garmin.service';
import { Component, OnInit } from '@angular/core';
import { GarminEvent } from 'src/app/models/garmin-event';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private gSvc: GarminService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.reload();
  }

  isLoading = false;
  events: GarminEvent[] = [];
  totalEvents = 0;
  yearCounts: Map<number, number> = new Map<number, number>();
  totalMiles: number = 0;
  marathonEquivalent: number = 0;
  totalCalories: number = 0;
  oreoEquivalent: number = 0;
  totalAscent: number = 0;
  everestEquivalent: number = 0;
  totalTime: string = "";
  maxDistance: number = 0;
  maxCalories: number = 0;
  maxTime: string = "";

  // attempt to obtain all from API
  reload = (): void => {
    this.isLoading = true;
    this.gSvc.index().subscribe(
      (data) => {
        this.events = data;
        this.isLoading = false;
        this.setSummaries();
      },
      (err) => {
        console.error('GarminEventsComponent index() says: ' + err);
      }
    );
  };

  setSummaries = (): void => {
    let seconds = 0;
    let maxD = 0;
    let maxC = 0;
    let maxT = 0;
    for (let evt of this.events) {
      if (evt) {
        this.totalEvents += 1;
        this.totalMiles += evt.distance ? evt.distance : 0;
        this.totalCalories += evt.calories ? evt.calories : 0;
        this.totalAscent += evt.ascent ? evt.ascent : 0;
        if (evt.distance && evt.distance > maxD) {
          maxD = evt.distance;
        }
        if (evt.calories && evt.calories > maxC) {
          maxC = evt.calories;
        }

        // total time
        if (evt.time) {
          let arr = evt.time.split(':');
          let s = 0;
          if (arr[0]) {
            s += parseInt(arr[0]) * 60 * 60;
          }
          if (arr[1]) {
            s += parseInt(arr[1]) * 60;
          }
          if (arr[2]) {
            s += parseInt(arr[2]);
          }
          seconds += s;
          if (s > maxT) {
            maxT = s;
          }
        }
      }

      let date: Date = new Date();
      if (evt.date) {
        date = new Date(Date.parse(evt.date));
      }
      let year = date.getFullYear();
      if (this.yearCounts.has(year)) {
        let count = this.yearCounts.get(year);
        if (count) {
          this.yearCounts.set(year, count + 1);
        }
      } else {
        this.yearCounts.set(year, 1);
      }
    }
    this.totalTime = this.secondsToHms(seconds);
    this.totalMiles = Math.round(this.totalMiles);
    this.maxTime = this.secondsToHms(maxT);
    this.maxDistance = maxD;
    this.maxCalories = maxC;
    this.everestEquivalent = Math.round(this.totalAscent / 11433.7);
    this.marathonEquivalent = Math.round(this.totalMiles / 26.2188);
    this.oreoEquivalent = Math.round(this.totalCalories / 53);
  };

  secondsToHms(sec: number):string {
    var d = Math.floor(sec / (3600*24));
    var h = Math.floor(sec % (3600*24) / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 60);
    m += Math.round(s / 60);
    if (d > 0) {
      return d + ' days, ' + h + ' hrs, ' + m + ' min';
    } else {
      return h + ' hrs, ' + m + ' min';
    }
  }
}
