import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiUrl = environment.apiUrl + "/location/";
  
  constructor(private http: HttpClient) { }
  getLocation() {
    return this.http.get(this.apiUrl + 'getLocation', {})
  }

  checkLocation(data) {
    return this.http.post(this.apiUrl + 'checkLocation', data)
  }

  updateLocation(data) {
    return this.http.post(this.apiUrl + 'updateLocation', data)
  }
}
