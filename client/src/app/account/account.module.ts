import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ValidateTokenComponent } from './validate-token/validate-token.component';
import { ActivationComponent } from './activation/activation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ValidateTokenComponent, ActivationComponent, ForgotPasswordComponent, ConfirmPasswordComponent],
  imports: [
    AccountRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AccountModule { }
