import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
    this.createForgotForm();
  }

  createForgotForm()
  {
    this.forgotForm = this.fb.group({
      password:[null, Validators.required],
      oldPassword: [null, Validators.required]
    });
  }

  onSubmit() {
    this.accountService.activateUser(this.forgotForm.value).subscribe(() => {
      this.router.navigateByUrl('/confirm');
    },error => {
      console.error(error);
      this.errors = error.errors;
    });
  }

}
