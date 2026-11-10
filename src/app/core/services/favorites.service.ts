import { computed, inject, Service, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Photo } from '../models/photo';

const STORAGE_KEY = 'favorites';

@Service()
export class FavoritesService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly favoritesSignal = signal<Photo[]>(this.load());
  readonly favorites = this.favoritesSignal.asReadonly();
  readonly favoriteIds = computed(() => new Set(this.favoritesSignal().map((p) => p.id)));

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  getById(id: string): Photo | undefined {
    return this.favoritesSignal().find((p) => p.id === id);
  }

  add(photo: Photo): boolean {
    if (this.isFavorite(photo.id)) {
      return false;
    }
    this.favoritesSignal.update((list) => [photo, ...list]);
    this.save();
    return true;
  }

  private save(): void {
    this.localStorage.setItem(STORAGE_KEY, this.favoritesSignal());
  }

  private load(): Photo[] {
    const saved = this.localStorage.getItem(STORAGE_KEY);
    return Array.isArray(saved) ? saved.filter(isPhoto) : [];
  }

  remove(id: string): void {
    this.favoritesSignal.update((list) => list.filter((p) => p.id !== id));
    this.save();
  }
}

function isPhoto(value: unknown): value is Photo {
  const photo = value as Partial<Photo> | null;
  return (
    typeof photo?.id === 'string' &&
    typeof photo.thumbnailUrl === 'string' &&
    typeof photo.fullUrl === 'string'
  );
}
