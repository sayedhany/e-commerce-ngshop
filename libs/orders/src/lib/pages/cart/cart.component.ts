import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem, CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit, OnDestroy {
    quantity!: number;
    cartItemDetailed: CartItemDetailed[] = [];
    endsubs$: Subject<any> = new Subject();
    constructor(
        private cartSrv: CartService,
        private ordersSrv: OrdersService
    ) {}
    deleteCartItem(cartItem: CartItemDetailed) {
        this.cartSrv.deleteCartItem(cartItem.product.id);
    }

    ngOnInit(): void {
        this._getCartDetails();
    }
    private _getCartDetails() {
        this.cartSrv.cart$
            .pipe(takeUntil(this.endsubs$))
            .subscribe((respCart) => {
                this.cartItemDetailed = [];
                respCart.items?.forEach((cartItem) => {
                    this._getProduct(cartItem);
                });
            });
    }
    private _getProduct(cartItem: CartItem) {
        this.ordersSrv
            .getProduct(cartItem.productid as string)
            .subscribe((product: any) => {
                this.cartItemDetailed.push({
                    product: product,
                    quantity: cartItem.quantity
                });
            });
    }
    updateCartItemQuantity(value: any, cartItem: CartItemDetailed) {
        this.cartSrv.setCartItem(
            {
                productid: cartItem.product.id,
                quantity: value.value
            },
            true
        );
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }
}
