import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogParams } from 'src/app/shared/models/logParams';
import { ILogPagination, LogPagination } from 'src/app/shared/models/logPagination';
import { map } from 'rxjs/operators';
import { ILog } from '../../shared/models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl;

  logParams = new LogParams();
  pagination = new LogPagination();
  constructor(private http: HttpClient) { }

  getLogsForUser() {

    let params = new HttpParams();
    params = params.append('sort', this.logParams.sort);
    params = params.append('pageIndex', this.logParams.pageNumber.toString());
    params = params.append('pageSize', this.logParams.pageSize.toString());

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
