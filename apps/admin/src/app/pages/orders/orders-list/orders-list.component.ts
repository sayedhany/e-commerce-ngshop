import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@cairo/orders';
import { ORDER_STATUS } from '../order.constants';
@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    ordrStatus = ORDER_STATUS;
    constructor(private orderSrv: OrdersService, private route: Router) {}

    ngOnInit(): void {
        this._getOrders();
    }
    onDelete($event) {}
    onShow(id: string) {
        this.route.navigateByUrl(`orders/${id}`);
    }
    private _getOrders() {
        this.orderSrv.getOrders().subscribe((orders) => {
            this.orders = orders;
        });
    }
}
