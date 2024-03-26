import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@cairo/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product = {};
    @Output() messageN: EventEmitter<any> = new EventEmitter();
    constructor(
        private cartSrv: CartService,
        private messageSrv: MessageService
    ) {}

    ngOnInit(): void {}
    addProductToCart() {
        const cartItem: CartItem = {
            productid: this.product.id,
            quantity: 1
        };
        this.messageN.emit();
        this.cartSrv.setCartItem(cartItem);
    }
}
