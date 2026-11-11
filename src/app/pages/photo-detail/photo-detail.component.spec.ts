import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Photo } from '../../core/models/photo';
import { FavoritesService } from '../../core/services/favorites.service';
import { PhotoDetailComponent } from './photo-detail.component';

const saved: Photo = { id: 'abc', thumbnailUrl: 'thumb-abc', fullUrl: 'full-abc' };

describe('PhotoDetailComponent', () => {
  beforeEach(() => {
    localStorage.setItem('favorites', JSON.stringify([saved]));
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
  });

  afterEach(() => localStorage.clear());

  // Opens a URL like the browser would: real routes, with :id passed to the input.
  async function open(url: string) {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url, PhotoDetailComponent);
    return harness;
  }

  it('shows "Photo not found" for an id that is not a favorite', async () => {
    const page = (await open('/photos/made-up-id')).routeNativeElement!;

    expect(page.querySelector('img')).toBeNull();
    expect(page.textContent).toContain('Photo not found');
  });

  it('removes the photo and goes back to the favorites page', async () => {
    const harness = await open('/photos/abc');

    harness.routeNativeElement!.querySelector('button')!.click();
    await harness.fixture.whenStable(); // waits for the navigation to finish

    expect(TestBed.inject(FavoritesService).favorites()).toEqual([]);
    expect(TestBed.inject(Router).url).toBe('/favorites');
  });
});
