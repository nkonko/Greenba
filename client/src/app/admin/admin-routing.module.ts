import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LogDetailComponent } from './logs/logs/log-detail/log-detail.component';
import { LogsComponent } from './logs/logs/logs.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'create', component: EditProductComponent, data: {breadcrumb: 'Crear'}},
  {path: 'edit/:id', component: EditProductComponent, data: {breadcrumb: 'Editar'}},
  {path: 'logs', component: LogsComponent, data: {breadcrumb: 'Bitacora'}},
  {path: 'users', component: UsersComponent, data: {breadcrumb: 'Usuarios'}},
  {
    path: 'logs/:id',
    component: LogDetailComponent,
    data: { breadcrumb: 'Detalle' },
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
