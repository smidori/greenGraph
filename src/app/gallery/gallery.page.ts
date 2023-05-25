import { Photo } from '@capacitor/camera';
import { PhotoService, UserPhoto } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ionViewWillEnter(){
    
  }
  
  async ngOnInit(){
    this.photoService.loadFiles(false);
  }

  async removePhoto(photo: UserPhoto, index: number){
    this.photoService.removePhoto(photo, index, false)
  }

  async addToFavorite(photo: UserPhoto){
    this.photoService.addToFavorite(photo);
  }


}
