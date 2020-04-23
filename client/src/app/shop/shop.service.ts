import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

// Acts like a singlton and get inil when the application starts
@Injectable({
  // Same as app.module.ts
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  // ts classes can be used as classes themself or as types like here
  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) { params = params.append('brandId', shopParams.brandId.toString()); }
    if (shopParams.typeId !== 0) { params = params.append('typeId', shopParams.typeId.toString()); }
    if (shopParams.search) { params = params.append('search', shopParams.search); }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    // observe will return the http response and not the body
    // return this.http.get<IPagination>(this.baseUrl + 'products', {params}) Works fine
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct = (id: number) => this.http.get<IProduct>(this.baseUrl + 'products/' + id);

  getBrands = () => this.http.get<IBrand[]>(this.baseUrl + 'products/brands');

  getTypes = () => this.http.get<IType[]>(this.baseUrl + 'products/types');
}
