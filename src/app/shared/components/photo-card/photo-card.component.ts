import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Photo } from '../../../core/models/photo';

type ImageStatus = 'loading' | 'loaded' | 'error';

@Component({
  imports: [MatIcon],
  selector: 'app-photo-card',
  styleUrl: './photo-card.component.scss',
  templateUrl: './photo-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardComponent {
  readonly photo = input.required<Photo>();
  readonly favorite = input(false);
  readonly size = input<'thumbnail' | 'full'>('thumbnail');

  protected readonly src = computed(() =>
    this.size() === 'full' ? this.photo().fullUrl : this.photo().thumbnailUrl,
  );

  protected readonly status = signal<ImageStatus>('loading');
}
