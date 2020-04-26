import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    // Nothing happens here because we did not subscripe to the HTTP GET method
    // For that we are going to use the async pipe inside the components (html)
    // that is why we use the pipe method here and not the subscripe
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        // set the next value for the behavior Subject (obserable)
        this.basketSource.next(basket);
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (response) => {
        this.basketSource.next(response);
      },
      (error) => console.log(error)
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

}
