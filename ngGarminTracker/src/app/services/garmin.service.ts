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

  show(id: Number): Observable<GarminEvent> {
    return this.http.get<GarminEvent>(this.url + id).pipe(
      catchError((err: any) => {
        return throwError(
          'garmin.service.ts.show(id=' + id + ') says: not found (404)'
        );
      })
    );
  }

  index(): Observable<GarminEvent[]> {
    return this.http.get<GarminEvent[]>(this.url + 'index').pipe(
      catchError((err: any) => {
        return throwError(
          'garmin.service.ts.index says: ' + err
        );
      })
    );
  }

  create(event: GarminEvent): Observable<GarminEvent> {
    console.log('svc create: ' + event);
    return this.http.post<GarminEvent>(this.url + 'create', event).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('garmin.service.ts.create says: ' + err)
        );
      })
    );
  }

  update(event: GarminEvent): Observable<GarminEvent> {
    // handle dates and other reformatting

    return this.http.put<GarminEvent>(this.url + 'update/' + event.id, event).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('garmin.service.ts.update says: ' + err)
        );
      })
    );
  }

  destroy(event: GarminEvent):Observable<void> {
    return this.http.delete<void>(this.url + 'delete/' + event.id);
  }

}
