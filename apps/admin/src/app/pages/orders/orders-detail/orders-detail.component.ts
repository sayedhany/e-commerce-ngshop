import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@cairo/orders';
import { ORDER_STATUS } from '@cairo/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
    order: Order;
    orderStatuses: any[];
    selectedStatus: any;
    endSubs$: Subject<any> = new Subject();
    constructor(
        private route: ActivatedRoute,
        private orderSrv: OrdersService,
        private messageSrv: MessageService
    ) {}

    ngOnInit(): void {
        this._mapOrderStatuses();
        this._getOrder();
    }
    private _mapOrderStatuses() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label
            };
        });
    }
    private _getOrder() {
        this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
            if (params.id) {
                this.orderSrv.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                });
            }
        });
    }
    onStatusChange($event) {
        this.orderSrv
            .updateOrder($event.value, this.order.id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(
                (updatedOrder) => {
                    this.order.status = updatedOrder.status;
                    this.messageSrv.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Order is updated!'
                    });
                },
                () => {
                    this.messageSrv.add({
                        severity: 'error',
                        summary: 'error',
                        detail: 'Order is not updated!'
                    });
                }
            );
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
