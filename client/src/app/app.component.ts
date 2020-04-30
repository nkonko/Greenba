import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  // On app init this function will be populating the navbar component.
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    // because of the new strategy we need to set somethin to the current user.
    // otherwise the authguard would not continue
    this.accountService.loadCurrentUser(token).subscribe(
      () => console.log('loaded user'),
      (error) => console.log(error)
    );
  }

  loadBasket() {
    // init the basket inside the app component
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => console.log('initialised basket'),
        (error) => console.log(error)
      );
    }
  }
}
