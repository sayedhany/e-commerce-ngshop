import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@cairo/orders';
import { ORDER_STATUS } from '@cairo/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    constructor(
        private orderSrv: OrdersService,
        private messageSrv: MessageService,
        private route: Router,
        private confirmationSrv: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }
    onDelete(id) {
        this.confirmationSrv.confirm({
            message: 'Do you want to delete this order?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.orderSrv.deleteOrder(id).subscribe(
                    () => {
                        // this.categories.filter((category) => category.id !== id);
                        this._getOrders();
                        this.messageSrv.add({
                            severity: 'success',
                            summary: 'success',
                            detail: 'the order is deleted'
                        });
                    },
                    () => {
                        this.messageSrv.add({
                            severity: 'error',
                            summary: 'error',
                            detail: 'Order is not deleted'
                        });
                    }
                );
            },
            reject: () => {
                this.messageSrv.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: 'You have cancelled'
                });
            }
        });
    }
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
