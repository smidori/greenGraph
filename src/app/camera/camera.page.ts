import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage {

  constructor(private photoService: PhotoService) {}

  takePhoto(){
    this.photoService.takePhoto();
  }
}
