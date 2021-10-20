import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Greenba';
  supportedLanguages = ['en', 'de'];

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(this.supportedLanguages);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      () => console.log('loaded user'),
      (error) => console.log(error)
    );
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => console.log('initialised basket'),
        (error) => console.log(error)
      );
    }
  }
}
