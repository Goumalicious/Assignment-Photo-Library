import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PHOTOS_API_CONFIG } from '../../core/config/photos-api-config';
import { PhotoApiService } from '../../core/services/photo-api.service';

@Component({
  imports: [PhotoGridComponent, LoaderComponent],
  selector: 'app-photos',
  styleUrl: './photos.component.scss',
  templateUrl: './photos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  private readonly api = inject(PhotoApiService);
  private readonly pageSize = inject(PHOTOS_API_CONFIG).pageSize;

  protected readonly firstPage = toSignal(this.api.getPhotos({ page: 1, limit: this.pageSize }));
}
