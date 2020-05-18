import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styleUrls: ['./photo-widget.component.scss']
})
export class PhotoWidgetComponent implements OnInit {
  @Output() addFile = new EventEmitter();
  files: File[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    // First clean the array, so that it contains only one image.
    this.files = [];
    this.files.push(... event.addedFiles);
    this.fileChangeEvent(this.files[0]);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
  }

  onUpload( ){
    console.log(base64ToFile(this.croppedImage));
    this.addFile.emit(base64ToFile(this.croppedImage));
  }

}
