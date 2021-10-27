import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createForgotForm();
  }

  createForgotForm()
  {
    this.forgotForm = this.fb.group({
      userName:[null, Validators.required],
    });
  }

  onSubmit() {
    this.accountService.forgotPassword(this.forgotForm.value).subscribe(() => {
      this.toast.success("Por favor revise su email");
      this.router.navigate(['/'])
    },error => {
      console.error(error);
      this.errors = error.errors;
    });
  }

}
