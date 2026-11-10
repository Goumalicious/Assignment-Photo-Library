import { inject, Service, signal } from '@angular/core';
import { PHOTOS_API_CONFIG } from '../config/photos-api-config';
import { Photo } from '../models/photo';
import { PhotoApiService } from './photo-api.service';

@Service()
export class PhotoStreamService {
  private readonly api = inject(PhotoApiService);
  private readonly pageSize = inject(PHOTOS_API_CONFIG).pageSize;

  private readonly photosSignal = signal<Photo[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal(false);
  private readonly hasMoreSignal = signal(true);
  private nextPage = 1;

  readonly photos = this.photosSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly hasMore = this.hasMoreSignal.asReadonly();

  loadNextPage(): void {
    // Blocks two requests at the same time, and never past the last page.
    if (this.loadingSignal() || !this.hasMoreSignal()) {
      return;
    }
    this.loadingSignal.set(true);
    this.errorSignal.set(false);

    this.api.getPhotos({ page: this.nextPage, limit: this.pageSize }).subscribe({
      next: (response) => {
        this.photosSignal.update((photos) => [...photos, ...response.items]);
        this.hasMoreSignal.set(response.hasMore);
        this.nextPage = response.page + 1;
        this.loadingSignal.set(false);
      },
      error: () => {
        // Keep the photos we already have and the same page number, so "Try again" retries it.
        this.errorSignal.set(true);
        this.loadingSignal.set(false);
      },
    });
  }
}
