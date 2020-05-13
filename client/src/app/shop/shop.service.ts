import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

// Angular will delete all data after a compontent has been destoyed
// Services are injected at start-up and are available for the life time our application is running
// A better option is to store the products (as a example) inside the service.
// And then get the products from the service rather then returning it directly to the component (so for each call).

// Acts like a singlton and get inil when the application starts
@Injectable({
  // Same as app.module.ts
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;

  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private http: HttpClient) {}

  // ts classes can be used as classes themself or as types like here
  // We only want to use the caching for paginated requests
  getProducts(useCache: boolean) {
    // if false we will reset the products array to an empty array
    if (!useCache) {
      this.products = [];
    }

    if (this.products.length > 0 && useCache) {
      const pagesReceived = Math.ceil(
        this.products.length / this.shopParams.pageSize
      );

      // If this is smaller we now that we got the items in our (cache) variable
      if (this.shopParams.pageNumber <= pagesReceived) {
        // 285 3:00
        this.pagination.data = this.products.slice(
          (this.shopParams.pageNumber - 1) * this.shopParams.pageSize,
          this.shopParams.pageNumber * this.shopParams.pageSize
        );
        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }
    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    // observe will return the http response and not the body
    // return this.http.get<IPagination>(this.baseUrl + 'products', {params}) Works fine
    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          // Instead of storing just the data inside the products array
          // We are going to append the data that we need to return
          this.products = [...this.products, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = this.products.find((p) => p.id === id);

    // We cannot directly return the product, because it wants an observable
    // of = we are returing an observable of something
    if (product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map((response) => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }

    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map((response) => {
        this.types = response;
        return response;
      })
    );
  }
}
