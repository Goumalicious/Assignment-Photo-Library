import { TestBed } from '@angular/core/testing';
import { PhotoApiService } from './photo-api.service';
import { PhotosApiConfig, providePhotosApi } from '../config/photos-api-config';
import { PageResponse } from '../models/page';
import { Photo } from '../models/photo';

const config: PhotosApiConfig = {
  baseUrl: 'https://images.test',
  pageSize: 12,
  latency: { min: 200, max: 300 },
  imageSize: { thumbnail: 100, full: 500 },
};

describe('PhotoApiService', () => {
  let service: PhotoApiService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [providePhotosApi(config)] });
    service = TestBed.inject(PhotoApiService);
  });

  afterEach(() => vi.useRealTimers());

  function fetchPage(page: number, limit: number): PageResponse<Photo> {
    let response: PageResponse<Photo> | undefined;
    service.getPhotos({ page, limit }).subscribe((r) => (response = r));
    vi.advanceTimersByTime(config.latency.max);
    return response!;
  }

  it('responds only after the simulated 200-300 ms delay', () => {
    let response: PageResponse<Photo> | undefined;
    service.getPhotos({ page: 1, limit: 12 }).subscribe((r) => (response = r));

    vi.advanceTimersByTime(199);
    expect(response).toBeUndefined();

    vi.advanceTimersByTime(101); // now at 300 ms
    expect(response).toBeDefined();
  });

  it('respects the limit parameter', () => {
    const response = fetchPage(3, 6);

    expect(response).toMatchObject({ page: 3, limit: 6, hasMore: true });
    expect(response.items).toHaveLength(6);
  });

  it('builds stable picsum "seed" URLs from each photo id', () => {
    const photo = fetchPage(1, 1).items[0];

    expect(photo.thumbnailUrl).toBe(`https://images.test/seed/${photo.id}/100/100`);
    expect(photo.fullUrl).toBe(`https://images.test/seed/${photo.id}/500/500`);
  });

  it('gives every photo a unique id', () => {
    const ids = fetchPage(1, 100).items.map((photo) => photo.id);

    expect(new Set(ids).size).toBe(100);
  });
});
