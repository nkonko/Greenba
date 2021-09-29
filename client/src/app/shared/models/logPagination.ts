import { ILog } from './log';

export interface ILogPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: ILog[];
}

export class LogPagination implements ILogPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: ILog[] = [];
}