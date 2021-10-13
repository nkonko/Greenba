import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  activationForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
    this.createActivationForm();
  }

  createActivationForm()
  {
    this.activationForm = this.fb.group({
      password:[null, Validators.required],
      oldPassword: [null, Validators.required]
    });
  }

  onSubmit() {
    this.accountService.activateUser(this.activationForm.value).subscribe(() => {
      this.router.navigateByUrl('/shop');
    },error => {
      console.error(error);
      this.errors = error.errors;
    });
  }

}