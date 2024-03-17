/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}
    initCartLocalStorage() {
        const initCart = {
            items: []
        };
        // localStorage.setItem('cart', JSON.stringify(initCart));
    }
}
