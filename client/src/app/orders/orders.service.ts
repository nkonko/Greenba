import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrderForUser() {
    return this.http.get(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number){
    return this.http.get(this.baseUrl + 'orders/' + id);
  }
}
