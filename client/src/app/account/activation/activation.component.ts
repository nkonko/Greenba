import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  activationForm: FormGroup;
  errors: string[];
  username: string;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toast: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
     this.username = navigation.extras.state.userName;
    }
   }

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
    
    this.activationForm.value.userName = this.username;

    this.accountService.activateUser(this.activationForm.value).subscribe(() => {
      this.toast.success("Usuario activado");
      this.router.navigate(['/'])
    },error => {
      console.error(error);
      this.errors = error.errors;
    });
  }

}
