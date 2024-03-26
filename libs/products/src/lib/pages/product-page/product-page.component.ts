import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartItem, CartService } from '@cairo/orders';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product = {};
    endsubs$: Subject<any> = new Subject();
    quantity = 1;

    constructor(
        private productSrv: ProductsService,
        private route: ActivatedRoute,
        private cartSrv: CartService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this.productSrv
                    .getProduct(params.productid)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe((product) => {
                        this.product = product;
                    });
            }
        });
    }
    addProductToCart() {
        const cartItem: CartItem = {
            productid: this.product.id,
            quantity: this.quantity
        };
        this.cartSrv.setCartItem(cartItem);
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }
}
