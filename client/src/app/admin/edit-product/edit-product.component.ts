import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { ProductFormValues, IProduct } from 'src/app/shared/models/product';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues;
  brands: IBrand[];
  types: IType[];

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    ) {
      this.productFormValues = new ProductFormValues();
    }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brands]).subscribe(result => {
      this.brands = result[0];
      this.types = result[1];
    }, error => console.log(error), () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe((response: IProduct) => {
      const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand).id;
      const productTypeId = this.types && this.types.find(x => x.name === response.productType).id;
      this.product = response;
      this.productFormValues = {...response, productBrandId, productTypeId};
    });
  }

  getTypes() {
    return this.shopService.getBrands();
  }

  getBrands() {
    return this.shopService.getTypes();
  }

}
