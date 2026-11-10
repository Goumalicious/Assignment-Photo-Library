import { TestBed } from '@angular/core/testing';
import { Photo } from '../../../core/models/photo';
import { PhotoCardComponent } from './photo-card.component';

const photo: Photo = { id: 'abc', thumbnailUrl: 'thumb-abc', fullUrl: 'full-abc' };

describe('PhotoCardComponent', () => {
  async function setup() {
    const fixture = TestBed.createComponent(PhotoCardComponent);
    fixture.componentRef.setInput('photo', photo);
    await fixture.whenStable();
    return fixture;
  }

  it('shows a fallback instead of a broken image when loading fails', async () => {
    const fixture = await setup();
    const host: HTMLElement = fixture.nativeElement;

    host.querySelector('img')!.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    expect(host.querySelector('img')).toBeNull();
    expect(host.textContent).toContain('Image unavailable');
  });
});
