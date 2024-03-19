/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}
    initCartLocalStorage() {
        const initCart = {
            items: []
        };
        localStorage.setItem('cart', JSON.stringify(initCart));
    }
    setCartItem(cartItem: CartItem): Cart {
        const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY));
        cart.items.push(cartItem);

        return cart;
    }
}
