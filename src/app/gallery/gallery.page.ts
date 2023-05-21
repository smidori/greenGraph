import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

}
