import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Photo } from '../../core/models/photo';
import { FavoritesService } from '../../core/services/favorites.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';

@Component({
  imports: [PhotoGridComponent, MatButton, MatIcon, RouterLink],
  selector: 'app-favorites',
  styleUrl: './favorites.component.scss',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  protected readonly favorites = inject(FavoritesService).favorites;
  private readonly router = inject(Router);

  protected openPhoto(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
