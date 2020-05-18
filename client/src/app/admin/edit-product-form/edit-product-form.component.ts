import { Component, OnInit, Input } from '@angular/core';
import { ProductFormValues } from 'src/app/shared/models/product';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  editProductForm: FormGroup;
  @Input() product: ProductFormValues;
  @Input() brands: IBrand[];
  @Input() types: IType[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createEditProductForm();
    this.editProductForm.patchValue(this.product);
  }

  createEditProductForm() {
    this.editProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      // we need more validators
      price: new FormControl(0, [
        Validators.required,
        Validators.min(0.01),
        this.regexValidator(
          new RegExp(
            '\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\\.[0-9][0-9])?$'
          ),
          { noDecimal: true }
        ),
      ]),
      description: new FormControl(null, Validators.required),
      productBrandId: new FormControl(null, Validators.required),
      productTypeId: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {
        ...this.product,
        ...this.editProductForm.value,
        price: +this.editProductForm.get('price').value,
      };
      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        .subscribe(
          () => {
            this.router.navigate(['/admin']);
          },
          (error) => console.log(error)
        );
    } else {
      const newProduct = {
        ...this.editProductForm.value,
        price: +this.editProductForm.get('price').value,
      };
      this.adminService.createProduct(newProduct).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => console.log(error)
      );
    }
  }

  // Move this into a utils file
  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
