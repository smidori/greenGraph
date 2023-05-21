import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'gallery',
  //   loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  // },
  // {
  //   path: 'favourites',
  //   loadChildren: () => import('./favourites/favourites.module').then( m => m.FavouritesPageModule)
  // }
  // ,
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
