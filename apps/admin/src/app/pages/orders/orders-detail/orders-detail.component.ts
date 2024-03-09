import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@cairo/orders';
import { ORDER_STATUS } from '../order.constants';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order;
    orderStatuses: any[];
    selectedStatus: any;
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
        console.log(this.orderStatuses);
    }
    private _getOrder() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.orderSrv.getOrder(params.id).subscribe((order) => {
                    this.order = order;
                    console.log(this.order);
                });
            }
        });
    }
    onStatusChange($event) {
        console.log($event.value);
        this.orderSrv.updateOrder($event.value, this.order.id).subscribe(
            (updatedOrder) => {
                console.log(updatedOrder);
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
}
