import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  activationForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  createActivationForm()
  {
    this.activationForm = this.fb.group({
      password:[null, Validators.required],
      oldPassword: [null, Validators.required]
    })
  }

  onSubmit() {
    this.accountService.activateUser(this.activationForm.value).subscribe(() => {

    },error => {
      console.error(error);
    })
  }

}
