import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogParams } from 'src/app/shared/models/logParams';
import { ILogPagination, LogPagination } from 'src/app/shared/models/logPagination';
import { map } from 'rxjs/operators';
import { ILog } from '../../shared/models/log';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl;

  logParams = new LogParams();
  pagination = new LogPagination();

  constructor(private http: HttpClient) { }

  getLogsByParams() {

    let params = new HttpParams();
    params = params.append('sort', this.logParams.sort);
    params = params.append('pageIndex', this.logParams.pageNumber.toString());
    params = params.append('pageSize', this.logParams.pageSize.toString());
    params = params.append('level', this.logParams.level);

    if (this.logParams) {
      if (this.logParams.dateFrom) {
        this.logParams.dateFrom = moment(this.logParams.dateFrom).format("YYYY-MM-DD");
        params = params.append('dateFrom', this.logParams.dateFrom);
      }

      if (this.logParams.dateTo) {
        this.logParams.dateTo = moment(this.logParams.dateTo).format("YYYY-MM-DD");
        params = params.append('dateTo', this.logParams.dateTo)
      }
    }

    return this.http.get<ILogPagination>(this.baseUrl + 'logs', {
      observe: 'response',
      params,
    }).pipe(
      map((response) => {
        this.pagination = response.body;
        return this.pagination;
      })
    );
  }

  getLogDetailed(id: number) {
    return this.http.get<ILog>(this.baseUrl + 'logs/' + id);
  }

  getLogParams() {
    return this.logParams;
  }

  setLogParams(params: LogParams) {
    this.logParams = params;
  }
}
