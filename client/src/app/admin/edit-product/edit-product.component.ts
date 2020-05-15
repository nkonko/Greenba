import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ShopService } from 'src/app/shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormValues, IProduct } from 'src/app/shared/models/product';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  product: ProductFormValues;
  brands: IBrand[];
  types: IType[];

  constructor(
    private adminService: AdminService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.product = new ProductFormValues();
    }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();
    this.createEditProductForm();

    forkJoin([types, brands]).subscribe(result => {
      this.brands = result[0];
      this.types = result[1];
    }, error => console.log(error), () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
  }

  createEditProductForm() {
    this.editProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      // we need more validators
      price: new FormControl(0, [Validators.required, Validators.min(0.01), this.regexValidator(new RegExp('\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\\.[0-9][0-9])?$'), {noDecimal: true})]),
      description: new FormControl(null, Validators.required),
      productBrandId: new FormControl(null, Validators.required),
      productTypeId: new FormControl(null, Validators.required),
    });
  }

  loadProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe((response: IProduct) => {

      const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand).id;
      const productTypeId = this.types && this.types.find(x => x.name === response.productType).id;
      const product = {...response, productBrandId, productTypeId};
      this.product = product;
      this.editProductForm.patchValue(product);
    });
  }

  getTypes() {
    return this.shopService.getBrands();
  }

  getBrands() {
    return this.shopService.getTypes();
  }

  onSubmit(){
    if (this.route.snapshot.url[0].path === 'edit'){
      const updatedProduct = {...this.product, ...this.editProductForm.value, price: +this.editProductForm.get('price').value};
      this.adminService.updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id')).subscribe ( () => {
        this.router.navigate(['/admin']);
      }, error => console.log(error));
    } else {
      const newProduct = {...this.editProductForm.value, price: +this.editProductForm.get('price').value};
      this.adminService.createProduct(newProduct).subscribe(() => {
        this.router.navigate(['/admin']);
      }, error => console.log(error));
    }
  }

  // Move this into a utils file
  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): {[key: string]: string} => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
