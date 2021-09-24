import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product-photos',
  templateUrl: './edit-product-photos.component.html',
  styleUrls: ['./edit-product-photos.component.scss']
})
export class EditProductPhotosComponent implements OnInit {
  @Input() product: IProduct;
  progress = 0;
  addPhotoMode = false;

  constructor(private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  addPhotoModeToggle() {
    this.addPhotoMode = !this.addPhotoMode;
  }

  uploadFile(file: File) {
    this.adminService.uploadImage(file, this.product.id).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.product = event.body;
          setTimeout(() => {
            this.progress = 0;
            this.addPhotoMode = false;
          }, 1500);
      }
    }, error => {
      if (error.errors) {
        this.toast.error(error.errors[0]);
      } else {
        this.toast.error('Problema al cargar imagen');
      }
      this.progress = 0;
    });
  }

  deletePhoto(photoId: number) {
    this.adminService.deleteProductPhoto(photoId, this.product.id).subscribe(() => {
      const photoIndex = this.product.photos.findIndex(x => x.id === photoId);
      this.product.photos.splice(photoIndex, 1);
    }, error => {
      this.toast.error('Problema al borrar imagen');
      console.log(error);
    });
  }

  setMainPhoto(photoId: number) {
    this.adminService.setMainPhoto(photoId, this.product.id).subscribe((product: IProduct) => {
      this.product = product;
    });
  }

}
