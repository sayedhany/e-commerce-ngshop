/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject, Subject } from 'rxjs';
export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());
    constructor() {}
    initCartLocalStorage() {
        const cart = this.getCart();
        if (!cart) {
            const initCart = {
                items: []
            };
            localStorage.setItem('cart', JSON.stringify(initCart));
        }
    }
    getCart(): Cart {
        return JSON.parse(localStorage.getItem(CART_KEY) as string) as Cart;
    }
    setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
        const cart: Cart = this.getCart();
        const cartItemExist = cart.items?.find(
            (cart) => cart.productid === cartItem.productid
        );
        if (cartItemExist) {
            cart.items?.forEach((cart: CartItem) => {
                if (cart && cart.productid === cartItem.productid) {
                    if (updateCartItem) {
                        cart.quantity = cartItem.quantity;
                    } else {
                        cart.quantity =
                            (cart.quantity as number) +
                            (cartItem.quantity as number);
                    }
                }
            });
        } else {
            cart.items?.push(cartItem);
        }
        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }
    deleteCartItem(id: string) {
        const cart: any = this.getCart();
        cart.items = cart.items?.filter(
            (cartItem: any) => cartItem.productid !== id
        );
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        this.cart$.next(cart);
        return cart;
    }
    emptyCart() {
        const initCart = {
            items: []
        };
        localStorage.setItem('cart', JSON.stringify(initCart));
        this.cart$.next(initCart);
    }
}
