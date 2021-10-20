import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ValidateTokenComponent } from './validate-token/validate-token.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivationComponent } from './activation/activation.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: { breadcrumb: 'Ingresar' }},
  {path: 'register', component: RegisterComponent, data: { breadcrumb: 'Registro' }},
  {path: 'validate', component: ValidateTokenComponent, data: { breadcrumb: 'Validar identidad' }},
  {path: 'forgotPassword', component: ForgotPasswordComponent, data: { breadcrumb: 'Olvidaste tu contraseña?' }},

  {path: 'confirmPassword', component: ConfirmPasswordComponent, data: { breadcrumb: 'Confirmar contraseña' }},
  {path: 'activation', component: ActivationComponent, data: { breadcrumb: 'Activacion' }}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { 

  constructor() {
    
  }
}
