import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService,private router: Router, private toast:ToastrService) { }

  ngOnInit(): void {
    this.createForgotForm();
  }

  createForgotForm()
  {
    this.forgotForm = this.fb.group({
      password:[null, Validators.required],
      confirmPassword:[null, Validators.required]
    });
  }

  onSubmit() {
    this.accountService.changePassword(this.forgotForm.value).subscribe(() => {
      this.toast.success('Contraseña cambiada');
      this.router.navigateByUrl('/home');
    },error => {
      console.error(error);
      this.errors = error.errors;
    });
  }
}
