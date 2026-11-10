import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(LocalStorageService);
  });

  it('saves a value and reads it back', () => {
    service.setItem('key', { name: 'photo', ids: [1, 2] });

    expect(service.getItem('key')).toEqual({ name: 'photo', ids: [1, 2] });
  });

  it('returns null for a key that was never saved', () => {
    expect(service.getItem('missing')).toBeNull();
  });

  it('returns null instead of crashing when the saved value is not valid JSON', () => {
    localStorage.setItem('key', '{not json');

    expect(service.getItem('key')).toBeNull();
  });
});
