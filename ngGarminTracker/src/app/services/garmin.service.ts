import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GarminService {
  private url = environment.baseUrl + 'api';

  constructor(private http: HttpClient) {}
}
