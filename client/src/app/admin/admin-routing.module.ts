import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'create', component: EditProductComponent, data: {breadcrumb: 'Crear'}},
  {path: 'edit/:id', component: EditProductComponent, data: {breadcrumb: 'Editar'}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
