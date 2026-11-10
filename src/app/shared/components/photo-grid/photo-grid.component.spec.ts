import { TestBed } from '@angular/core/testing';
import { Photo } from '../../../core/models/photo';
import { PhotoGridComponent } from './photo-grid.component';

const photos: Photo[] = ['a', 'b', 'c'].map((id) => ({
  id,
  thumbnailUrl: `thumb-${id}`,
  fullUrl: `full-${id}`,
}));

describe('PhotoGridComponent', () => {
  async function setup() {
    const fixture = TestBed.createComponent(PhotoGridComponent);
    fixture.componentRef.setInput('photos', photos);
    await fixture.whenStable();
    return fixture;
  }

  it('emits the photo that was clicked', async () => {
    const fixture = await setup();
    const selected: Photo[] = [];
    fixture.componentInstance.photoSelected.subscribe((photo) => selected.push(photo));

    const host: HTMLElement = fixture.nativeElement;
    host.querySelectorAll('button')[1].click();

    expect(selected).toEqual([photos[1]]);
  });
});
