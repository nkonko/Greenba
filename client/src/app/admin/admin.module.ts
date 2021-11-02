import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EditProductFormComponent } from './product/edit-product-form/edit-product-form.component';
import { EditProductPhotosComponent } from './product/edit-product-photos/edit-product-photos.component';
import { LogsComponent } from './logs/logs/logs.component';
import { LogDetailComponent } from './logs/logs/log-detail/log-detail.component';
import { UsersComponent } from './users/users.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminComponent, EditProductComponent, EditProductFormComponent, EditProductPhotosComponent, LogsComponent, LogDetailComponent, UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    TranslateModule
  ]
})
export class AdminModule { }
