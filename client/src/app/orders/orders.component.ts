import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrderParams } from '../shared/models/orderParams';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  totalCount: number;
  orders: IOrder[];
  orderParams: OrderParams;
  
  timeOptions = [
    { name: 'Mas nuevas', value: 'Newest' },
    { name: 'Mas viejas', value: 'Oldest' }
  ]

  statusOptions = [
    { name: 'Pendiente', value: 'pending' },
    { name: 'Entregado', value: 'delivered' },
    { name: 'Cancelado', value: 'canceled' }
  ]

  constructor(private ordersService: OrdersService, private fb: FormBuilder) { 
    this.orderParams = this.ordersService.getOrderParams();
  }

  ngOnInit(): void {
    this.getOrders();
    this.createForm();
  }

  getOrders() {
    // this.ordersService.getOrderForUser().subscribe((orders: IOrder[]) => {
    //   this.orders = orders;
    // }, error => {
    //   console.log(error);
    // });
    this.ordersService.getOrdersByParams().subscribe((response) => {

      this.orders = response.data;
      this.totalCount = response.count;

    }, error => {
      console.log(error);
    });
  }

  onSortSelected(sort: string) {
    const params = this.ordersService.getOrderParams();
    params.sort = sort;
    this.ordersService.setOrderParams(params);
    this.getOrders();
  }

  onPageChanged(pageNumber: number) {
    const params = this.ordersService.getOrderParams();
    if (params.pageNumber !== pageNumber) {
      params.pageNumber = pageNumber;
      this.ordersService.getOrderParams();
      this.getOrders();
    }
  }

  createForm() {
    this.orderForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }

  onStatusSelected(state: string) {
    const params = this.ordersService.getOrderParams();
    params.state = state;
    this.ordersService.setOrderParams(params);
    this.getOrders();
  }

  filter() {
    
    if (this.orderForm.controls.dateFrom.value || this.orderForm.controls.dateTo.value){
      
      const params = this.ordersService.getOrderParams();
      params.dateFrom = this.orderForm.controls.dateFrom.value;
      params.dateTo = this.orderForm.controls.dateTo.value;

      this.ordersService.setOrderParams(params);
      this.ordersService.getOrdersByParams().subscribe((response)=> {

        this.orders = response.data;
        this.totalCount = response.count;
      }, error => {
        console.log(error);
      });
    }
  }
}
