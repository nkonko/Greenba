import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: IProduct[];
  totalCount: number;
  shopParams: ShopParams;

  constructor(private shopService: ShopService, private adminservice: AdminService) {
    this.shopParams = this.shopService.getShopParams();
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => console.log(error));
  }

  onPageChanged(pageNumber: number){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== pageNumber) {
      params.pageNumber = pageNumber;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  deleteProduct(id: number) {
    this.adminservice.deleteProduct(id).subscribe(() => {
       this.products.splice(this.products.findIndex(p => p.id === id), 1);
       this.totalCount --;
       if ((this.shopParams.pageSize * (this.shopParams.pageNumber - 1)) === this.totalCount){
         this.shopParams.pageNumber --;
        this.shopService.setShopParams(this.shopParams);
       this.getProducts();
       }
    }, error => console.log(error));
  }
}
