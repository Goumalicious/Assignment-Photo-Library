import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { providePhotosApi } from '../config/photos-api-config';
import { PageResponse } from '../models/page';
import { Photo } from '../models/photo';
import { PhotoApiService } from './photo-api.service';
import { PhotoStreamService } from './photo-stream.service';

/** A fake API response: page n with two photos. */
function page(n: number): PageResponse<Photo> {
  const items = ['a', 'b'].map((x) => ({ id: `${n}${x}`, thumbnailUrl: '', fullUrl: '' }));
  return { items, page: n, limit: 2, hasMore: true };
}

describe('PhotoStreamService', () => {
  const getPhotos = vi.fn();

  beforeEach(() => {
    getPhotos.mockReset();
    TestBed.configureTestingModule({
      providers: [
        providePhotosApi({
          baseUrl: '',
          pageSize: 2,
          latency: { min: 0, max: 0 },
          imageSize: { thumbnail: 1, full: 1 },
        }),
        { provide: PhotoApiService, useValue: { getPhotos } },
      ],
    });
  });

  it('loads pages one after another and appends them', () => {
    getPhotos.mockReturnValueOnce(of(page(1))).mockReturnValueOnce(of(page(2)));
    const stream = TestBed.inject(PhotoStreamService);

    stream.loadNextPage();
    stream.loadNextPage();

    expect(getPhotos.mock.calls.map(([request]) => request)).toEqual([
      { page: 1, limit: 2 },
      { page: 2, limit: 2 },
    ]);
    expect(stream.photos().map((p) => p.id)).toEqual(['1a', '1b', '2a', '2b']);
  });

  it('does not send a second request while one is loading', () => {
    getPhotos.mockReturnValue(new Subject()); // a response that never arrives
    const stream = TestBed.inject(PhotoStreamService);

    stream.loadNextPage();
    stream.loadNextPage();

    expect(getPhotos).toHaveBeenCalledTimes(1);
    expect(stream.loading()).toBe(true);
  });

  it('shows an error when a page fails, and retries the same page', () => {
    getPhotos.mockReturnValueOnce(throwError(() => new Error('offline')));
    getPhotos.mockReturnValueOnce(of(page(1)));
    const stream = TestBed.inject(PhotoStreamService);

    stream.loadNextPage();
    expect(stream.error()).toBe(true);
    expect(stream.loading()).toBe(false);

    stream.loadNextPage(); // "Try again"
    expect(getPhotos).toHaveBeenLastCalledWith({ page: 1, limit: 2 });
    expect(stream.error()).toBe(false);
    expect(stream.photos()).toHaveLength(2);
  });
});
