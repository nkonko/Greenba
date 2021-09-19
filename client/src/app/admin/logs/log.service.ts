import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLogsForUser() {
    return this.http.get(this.baseUrl + 'logs');
  }

  getLogsDetailed(id: number){
    return this.http.get(this.baseUrl + 'logs/' + id);
  }
}
