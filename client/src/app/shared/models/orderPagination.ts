import { IOrder } from './order';

export interface IOrderPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IOrder[];
}

export class OrderPagination implements IOrderPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IOrder[] = [];
}