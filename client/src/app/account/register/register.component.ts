import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      // first paramater = initial val
      displayName: [null, [Validators.required]],
      // sync validators
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')] ,
        // Async validators
        // Those are only get called when our sync validators have passed validation
        [this.validateEmailNotTaken()]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    });
  }

  // Async validator to check if our email address exist (while typing).
  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      // Delay so that we dont always make a request.
      return timer(500).pipe(
        // 201
        // return the inner observable to our control (which is te outer observable)
        switchMap(() => {
          if (!control.value) {
            // of - return a observable of something
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              // emailExists can we make up ourself to call the validator
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }

}
