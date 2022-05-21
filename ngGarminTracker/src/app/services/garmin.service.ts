import { GarminEvent } from './../models/garmin-event';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class GarminService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  private url = environment.baseUrl + '/api/';
  private events: GarminEvent[] = [];

  show(id: number): Observable<GarminEvent> {
    // console.log(this.url + id);
    return this.http.get<GarminEvent>(this.url + id).pipe(
      catchError((err: any) => {
        // console.log(err);
        return throwError(
          'garmin.service.ts.show(id=' + id + ') says: not found (404)'
        );
      })
    );
  }

  create(event: GarminEvent): Observable<GarminEvent> {
    console.log(event);
    return this.http.post<GarminEvent>(this.url + 'create', event).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('garmin.service.ts.create: ' + err)
        );
      })
    );
  }
}
