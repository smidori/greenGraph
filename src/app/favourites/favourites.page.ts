import { Component, OnInit } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  async ngOnInit(){
    this.photoService.loadFiles(true);
  }

  async removePhoto(photo: UserPhoto, index: number){
    this.photoService.removePhoto(photo, index, true)
  }
}
