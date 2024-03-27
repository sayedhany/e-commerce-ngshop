import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
    selector: 'orders-thank-you-page',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent implements OnInit {
    constructor(
        private ordersSrv: OrdersService,
        private cartSrv: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const order: Order = this.ordersSrv.getOrderData();
        const session = this.ordersSrv.getSession();
        if (!session) {
            this.router.navigate(['/']);
        }
        this.ordersSrv.createOrder(order).subscribe(() => {
            if (session) {
                this.ordersSrv.removeSession();
            }
            this.cartSrv.emptyCart();
            this.ordersSrv.removeCashedOrderedData();
        });
    }
}
