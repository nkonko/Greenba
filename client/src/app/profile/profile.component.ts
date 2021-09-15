import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersService } from '../orders/orders.service';
import { IOrder } from '../shared/models/order';
import { IUser } from '../shared/models/user';
import { AccountService } from '../account/account.service';
import { IAddress } from '../shared/models/address';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public orders: IOrder[];
  public currentUser$: Observable<IUser>;
  public address: IAddress;

  constructor(private ordersService: OrdersService, private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.getOrders();
    this.getAddress();
  }

  getOrders() {
    this.ordersService.getOrderForUser().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }

  getAddress() {
    this.accountService.getUserAddress().subscribe((address: IAddress) => {
    this.address = address;
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }

}
