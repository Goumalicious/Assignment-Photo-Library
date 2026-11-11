import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';
import { PhotoStreamService } from '../../core/services/photo-stream.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Photo } from '../../core/models/photo';
import { FavoritesService } from '../../core/services/favorites.service';
import { MatButton } from '@angular/material/button';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  imports: [PhotoGridComponent, LoaderComponent, InfiniteScrollDirective, MatButton],
  selector: 'app-photos',
  styleUrl: './photos.component.scss',
  templateUrl: './photos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  protected readonly photoStream = inject(PhotoStreamService);
  protected readonly favorites = inject(FavoritesService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly breakpoints = inject(BreakpointObserver);

  protected addToFavorites(photo: Photo): void {
    const added = this.favorites.add(photo);
    const message = added ? 'Added to favorites' : 'Already in your favorites';
    const isMobile = this.breakpoints.isMatched(Breakpoints.Handset);
    this.snackBar.open(message, undefined, {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: isMobile ? 'bottom' : 'top',
    });
  }
}
