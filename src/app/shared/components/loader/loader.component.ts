import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [MatProgressSpinner],
  selector: 'app-loader',
  styleUrl: './loader.component.scss',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  readonly label = input('Loading...');
}
