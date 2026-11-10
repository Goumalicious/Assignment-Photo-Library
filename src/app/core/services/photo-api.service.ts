import { inject, Service } from '@angular/core';
import { PHOTOS_API_CONFIG } from '../config/photos-api-config';
import { PageRequest, PageResponse } from '../models/page';
import { defer, delay, Observable, of } from 'rxjs';
import { Photo } from '../models/photo';

@Service()
export class PhotoApiService {
  private readonly config = inject(PHOTOS_API_CONFIG);

  getPhotos({ page, limit }: PageRequest): Observable<PageResponse<Photo>> {
    //defer is used to create the Observable only when someone subscribes to it, and every subscription is a new request that returns new photos.
    return defer(() => {
      const items = Array.from({ length: limit }, () => this.createPhoto(randomId()));
      return of({ items, page, limit, hasMore: true }).pipe(delay(this.randomLatency()));
    });
  }

  private createPhoto(id: string): Photo {
    const { baseUrl, imageSize } = this.config;
    //Used the seed parameter (its in the docs) in order to get a new image for every new id, but the same image for the same id.
    return {
      id,
      thumbnailUrl: `${baseUrl}/seed/${id}/${imageSize.thumbnail}/${imageSize.thumbnail}`,
      fullUrl: `${baseUrl}/seed/${id}/${imageSize.full}/${imageSize.full}`,
    };
  }

  private randomLatency(): number {
    const { min, max } = this.config.latency;
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 12);
}
