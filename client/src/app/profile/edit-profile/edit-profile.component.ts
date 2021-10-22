import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../shared/models/user';
import { IAddress } from '../../shared/models/address';
import { ConfirmPasswordValidator } from './validator/confirm-password.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public currentUser: IUser;

  profileForm: FormGroup;
  addressForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
    this.createForms();
    this.getAddressFormValues();
  }

  createForms() {
    this.profileForm = this.fb.group({
      userName: [this.currentUser.email],
      newUserName: [this.currentUser.displayName, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, {
      validators: ConfirmPasswordValidator("password", "confirmPassword")
    });

    this.addressForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      street: [null, Validators.required],
      city: [null, Validators.required],
      province: [null, Validators.required],
      cp: [null, Validators.required],
    })
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(
      (address) => {
        if (address) {
          this.addressForm.patchValue(address);
        }
      },
      (error) => {
        if (error.errors) {
          this.toastr.error("Problema al guardar los datos");
        }
      }
    );
  }

  onSubmitAddress() {
    this.accountService.updateUserAddress(this.addressForm.value).subscribe((address: IAddress) =>{
      this.toastr.success('Direccion guardada');
      this.addressForm.reset(address);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }

  onSubmitProfile() {
    this.accountService.changeProfile(this.profileForm.value).subscribe((response: IUser) => {
    this.toastr.success('Datos guardados');
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }

}
