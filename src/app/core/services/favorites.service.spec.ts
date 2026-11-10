import { TestBed } from '@angular/core/testing';
import { Photo } from '../models/photo';
import { FavoritesService } from './favorites.service';

const photo = (id: string): Photo => ({ id, thumbnailUrl: `thumb-${id}`, fullUrl: `full-${id}` });

describe('FavoritesService', () => {
  beforeEach(() => localStorage.clear());

  it('adds photos with the correct order', () => {
    const service = TestBed.inject(FavoritesService);

    service.add(photo('a'));
    service.add(photo('b'));

    expect(service.favorites().map((p) => p.id)).toEqual(['b', 'a']);
    expect(service.isFavorite('a')).toBe(true);
  });

  it('does not add the same photo twice', () => {
    const service = TestBed.inject(FavoritesService);

    expect(service.add(photo('a'))).toBe(true);
    expect(service.add(photo('a'))).toBe(false);
    expect(service.favorites()).toHaveLength(1);
  });

  it('removes a photo', () => {
    const service = TestBed.inject(FavoritesService);
    service.add(photo('a'));

    service.remove('a');

    expect(service.favorites()).toEqual([]);
    expect(service.getById('a')).toBeUndefined();
  });

  it('keeps favorites after a page refresh', () => {
    TestBed.inject(FavoritesService).add(photo('a'));

    TestBed.resetTestingModule(); // like a refresh: the next inject creates a brand-new service

    expect(TestBed.inject(FavoritesService).favorites()).toEqual([photo('a')]);
  });
});
