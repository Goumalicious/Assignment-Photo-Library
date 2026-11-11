import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { Photo } from '../../core/models/photo';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PhotoCardComponent } from '../../shared/components/photo-card/photo-card.component';

@Component({
  imports: [PhotoCardComponent, MatButton, MatIcon, RouterLink],
  selector: 'app-photo-detail',
  styleUrl: './photo-detail.component.scss',
  templateUrl: './photo-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailComponent {
  readonly id = input.required<string>();

  private readonly favorites = inject(FavoritesService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly breakpoints = inject(BreakpointObserver);

  protected readonly photo = computed(() => this.favorites.getById(this.id()));

  protected async remove(photo: Photo): Promise<void> {
    await this.router.navigate(['/favorites'], { replaceUrl: true }); // So the back button doesn't go back to the removed photo

    this.favorites.remove(photo.id);

    const isMobile = this.breakpoints.isMatched(Breakpoints.Handset);
    const snackBarRef = this.snackBar.open('Removed from favorites', 'Undo', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: isMobile ? 'bottom' : 'top',
    });
    snackBarRef.onAction().subscribe(() => this.favorites.add(photo));
  }
}
