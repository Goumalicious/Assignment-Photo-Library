import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-photos',
  styleUrl: './photos.component.scss',
  templateUrl: './photos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {}
