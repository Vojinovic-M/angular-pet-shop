import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /**
   * Saves an item to localStorage.
   * @param key - The key to store the value under.
   * @param value - The value to store.
   */
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieves an item from localStorage.
   * @param key - The key of the item to retrieve.
   * @returns The parsed value or null if not found.
   */
  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  }

  /**
   * Removes an item from localStorage.
   * @param key - The key of the item to remove.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
