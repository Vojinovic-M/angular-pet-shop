import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PetModel} from '../../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: PetModel[] = [];
  private storageKey = 'cart';

  addToCart(pet: PetModel) {
    const items = this.getItems();
    items.push(pet);
    this.saveItems(items);
  }

  getItems() {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  clearCart() {
    this.saveItems([]);
  }
  removeItem(index: number) {
    const items = this.getItems();
    items.splice(index, 1);
    this.saveItems(items);
  }

  private saveItems(items: PetModel[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>
    ('/assets/shipping.json');
  }

  constructor(private http: HttpClient) { }
}
