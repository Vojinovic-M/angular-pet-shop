import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PetModel} from '../../models/pet.model';

/**
 * CartService manages the shopping cart functionality, including
 * adding, removing, and clearing items, as well as fetching shipping prices.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Stores the current cart items
  items: PetModel[] = [];
  private storageKey = 'cart';

  constructor(private http: HttpClient) { }

  /**
   * Adds a pet to the shopping cart and updates localStorage.
   * @param pet The pet to be added to the cart.
   */
  addToCart(pet: PetModel): void {
    const items = this.getItems();
    items.push(pet);
    this.saveItems(items);
  }

  /**
   * Retrieves all items currently in the cart from localStorage.
   * @returns An array of PetModel objects.
   */
  getItems(): PetModel[] {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  /**
   * Clears all items from the cart and updates localStorage.
   */
  clearCart() {
    this.saveItems([]);
  }

  /**
   * Removes a specific item from the cart based on its index.
   * Updates the cart in localStorage.
   * @param index The index of the item to be removed.
   */
  removeItem(index: number) {
    const items = this.getItems();
    items.splice(index, 1);
    this.saveItems(items);
  }

  /**
   * Saves the provided items to localStorage.
   * @param items An array of PetModel objects to be stored.
   */
  private saveItems(items: PetModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  /**
   * Fetches the available shipping prices from a local JSON file.
   * @returns An Observable of shipping options (type and price).
   */
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>
    ('/assets/shipping.json');
  }

}
