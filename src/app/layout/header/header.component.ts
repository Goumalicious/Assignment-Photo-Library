import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [MatToolbar, MatButton, RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly links = [
    { path: '/', label: 'Photos' },
    { path: '/favorites', label: 'Favorites' },
  ];
}
