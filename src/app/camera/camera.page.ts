import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage {

  originalImage: string;
  modifiedImage: string;
  text: string;

  constructor(private photoService: PhotoService) {}

  takePhoto(){
    this.photoService.takePhoto();
  }

  // async takePhoto() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri,
  //     source: CameraSource.Camera,
  //   });

  //   this.originalImage = image.webPath;
  //   this.modifiedImage = image.webPath;
  // }

  // addTextToPhoto() {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');

  //   const imageElement = document.createElement('img');
  //   imageElement.src = this.originalImage;

  //   imageElement.onload = () => {
  //     canvas.width = imageElement.width;
  //     canvas.height = imageElement.height;

  //     context.drawImage(imageElement, 0, 0);

  //     context.font = '30px Arial';
  //     context.fillStyle = 'red';
  //     context.fillText(this.text, 10, 50);

  //     this.modifiedImage = canvas.toDataURL('image/jpeg');
  //   };
  // }

  // savePhotos() {
  //   //this.photoService.savePhoto(this.originalImage);
  //   //this.photoService.savePhoto(this.modifiedImage);
  // }
}
