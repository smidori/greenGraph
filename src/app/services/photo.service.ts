import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';


const IMAGE_DIR = 'stored-images';
const IMAGE_FAV_DIR = 'stored-images-fav';

@Injectable({
  providedIn: 'root'
})



export class PhotoService {

  //to store our photos and favorites
  public photos: UserPhoto[] = [];
  public favoritePhotos: UserPhoto[] = [];

  //private photo_storage = 'photos';

  constructor(private platform: Platform, private loadingCtrl: LoadingController) { }


  //load the list of photos saved before
  async loadFiles(onlyFavorite:boolean) {

    let imageDir = IMAGE_DIR
    if(onlyFavorite){
      imageDir = IMAGE_FAV_DIR
    }

    //show the message while is loading the pictures
    const loading = await this.loadingCtrl.create({
      message: "Loading pictures...",
    });
    await loading.present();
    try {
      const result = await Filesystem.readdir({
        directory: Directory.Data,
        path: imageDir
      });
  
      console.log('Promise log', result);
  
      await this.loadFileData(result.files, onlyFavorite);
    } catch (error) {
      console.log('error', error);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: imageDir
      });
    } finally {
      loading.dismiss();
    }
  
    // Filesystem.readdir({
    //   directory: Directory.Data,
    //   path: imageDir
    // }).then(result => {
    //   console.log('Promise log', result);
      
    //   this.loadFileData(result.files, onlyFavorite);

    // }, async err => {
    //   console.log('err', err);
    //   await Filesystem.mkdir({
    //     directory: Directory.Data,
    //     path: imageDir
    //   });
    // }).then(_ => {
    //   loading.dismiss();
    // })
  }

  //load each photo saved before
  async loadFileData(pictures: any = [], onlyFavorite: boolean){
    const imageDir = onlyFavorite ? IMAGE_FAV_DIR : IMAGE_DIR;
    
    for(let p of pictures ){
      const namePicture = p.name;
      const filePath = `${imageDir}/${namePicture}`
      
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });
      
      if(onlyFavorite){
        
          this.favoritePhotos.unshift({
            name: namePicture,
            path: filePath,
            data: `data:image/jpeg;base64,${readFile.data}`,
          })
        
      }else{
        this.photos.unshift({
          name: namePicture,
          path: filePath,
          data: `data:image/jpeg;base64,${readFile.data}`,
        })
      }
    }
  }

  //convert the photo into base64
  private async convertBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      return file.data;
    } else {
      const res = await fetch(photo.webPath!);
      const blob = await res.blob();

      return await this.convertBlobTo64(blob) as string;
    }
  }

  //convert the blob into base64
  private convertBlobTo64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.readAsDataURL(blob);
    })
  }

  //save the picture to device 
  async saveToDevice(photo: Photo) {
    const base64data = await this.convertBase64(photo)
    const filename = `Picture_${new Date().getTime()}.jpeg`;
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${filename}`,
      data: base64data,
      directory: Directory.Data
    })

    return {
      name: filename,
      path: `${IMAGE_DIR}/${filename}`,
      data: `data:image/jpeg;base64,${base64data}`
    }
  }

  //take photo using the camera
  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
    
    if (photo) { //for the first time that open the camera
      const savedImageFile = await this.saveToDevice(photo);
      this.photos.unshift(savedImageFile);
    }
  }


  async addToFavorite(photo: UserPhoto ){

    const base64data = photo.data
    const filename = photo.name;
    
    const loading = await this.loadingCtrl.create({
      message: "Adding to favorites...",
    });
    await loading.present();
    setTimeout(() => { loading.dismiss(); }, 500); //close the modal screen loading

    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_FAV_DIR}/${filename}`,
      data: base64data,
      directory: Directory.Data
    })
    photo.path = `${IMAGE_FAV_DIR}/${filename}`
    this.favoritePhotos.unshift(photo);
  }


  async removePhoto(photo: UserPhoto, index: number,isFavorite: boolean){
    await Filesystem.deleteFile({
      path: photo.path,
      directory: Directory.Data
    })
    if(isFavorite){
      this.favoritePhotos.splice(index,1);
    }else{
      this.photos.splice(index,1);
    }
    
  }


}

export interface UserPhoto {
  name: string;
  path: string;
  data: string;
  //webviewPath?: string;
}