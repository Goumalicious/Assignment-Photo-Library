import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Photos',
    loadComponent: () => import('./pages/photos/photos.component').then((m) => m.PhotosComponent),
  },
  {
    path: 'favorites',
    title: 'Favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: 'photos/:id',
    title: 'Photo',
    loadComponent: () =>
      import('./pages/photo-detail/photo-detail.component').then((m) => m.PhotoDetailComponent),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
