import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  username: string;
  forgotForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService,private router: Router, private toast:ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForgotForm();
    this.username = this.activatedRoute.snapshot.queryParamMap.get('user')
  }
  
  createForgotForm()
  {
    this.forgotForm = this.fb.group({
      password:[null, Validators.required],
      confirmPassword:[null, Validators.required],
      username: [null]
    });
  }
  
  onSubmit() {
    this.forgotForm.value.username = this.username;

    this.accountService.changePassword(this.forgotForm.value).subscribe(() => {
      this.toast.success('Contraseña cambiada');
      this.router.navigate(['/'])
    },error => {
      console.error(error);
      this.errors = error.errors;
    });
  }
}
