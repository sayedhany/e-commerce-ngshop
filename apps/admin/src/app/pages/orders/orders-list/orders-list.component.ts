import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@cairo/orders';
import { ORDER_STATUS } from '../order.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    ordrStatus = ORDER_STATUS;
    endSubs$: Subject<any> = new Subject();
    constructor(private orderSrv: OrdersService, private route: Router) {}

    ngOnInit(): void {
        this._getOrders();
    }
    onDelete($event) {}
    onShow(id: string) {
        this.route.navigateByUrl(`orders/${id}`);
    }
    private _getOrders() {
        this.orderSrv
            .getOrders()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((orders) => {
                this.orders = orders;
            });
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
