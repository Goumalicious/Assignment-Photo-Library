import { Service } from '@angular/core';

@Service()
export class LocalStorageService {
  getItem(key: string): unknown {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage with key "${key}":`, error);
      return null;
    }
  }

  setItem(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting item in localStorage with key "${key}":`, error);
    }
  }
}
