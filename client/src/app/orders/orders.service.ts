import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { OrderParams } from '../shared/models/orderParams';
import { OrderPagination, IOrderPagination } from '../shared/models/orderPagination';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  orderParams = new OrderParams();
  pagination = new OrderPagination();

  constructor(private http: HttpClient) { }

  getOrderForUser() {
    return this.http.get(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number){
    return this.http.get(this.baseUrl + 'orders/' + id);
  }

  getOrderParams() {
    return this.orderParams;
  }
  
  setOrderParams(params: OrderParams) {
    this.orderParams = params;
  }

  getOrdersByParams() {

    let params = new HttpParams();
    params = params.append('sort', this.orderParams.sort);
    params = params.append('pageIndex', this.orderParams.pageNumber.toString());
    params = params.append('pageSize', this.orderParams.pageSize.toString());
    params = params.append('state', this.orderParams.state);

    if (this.orderParams) {
      if (this.orderParams.dateFrom) {
        this.orderParams.dateFrom = moment(this.orderParams.dateFrom).format("YYYY-MM-DD");
        params = params.append('dateFrom', this.orderParams.dateFrom);
      }

      if (this.orderParams.dateTo) {
        this.orderParams.dateTo = moment(this.orderParams.dateTo).format("YYYY-MM-DD");
        params = params.append('dateTo', this.orderParams.dateTo)
      }
    }

    return this.http.get<IOrderPagination>(this.baseUrl + 'orders/getorders', {
      observe: 'response',
      params,
    }).pipe(
      map((response) => {
        this.pagination = response.body;
        return this.pagination;
      })
    );
  }

}
