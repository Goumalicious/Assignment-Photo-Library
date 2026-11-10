import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-photo-detail',
  styleUrl: './photo-detail.component.scss',
  templateUrl: './photo-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailComponent {
  readonly id = input.required<string>();
}
