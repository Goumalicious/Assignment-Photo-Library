import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { Photo } from '../../../core/models/photo';

@Component({
  imports: [PhotoCardComponent],
  selector: 'app-photo-grid',
  styleUrl: './photo-grid.component.scss',
  templateUrl: './photo-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGridComponent {
  readonly photos = input.required<Photo[]>();
  readonly favoriteIds = input<ReadonlySet<string>>(new Set());
  readonly photoSelected = output<Photo>();
}
