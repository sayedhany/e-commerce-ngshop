import { ProductsService } from '@cairo/products';
import { UsersService } from '@cairo/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@cairo/orders';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics = [];
    endSubs$: Subject<any> = new Subject();
    constructor(
        private userService: UsersService,
        private productService: ProductsService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.userService.getUsersCount(),
            this.productService.getProductsCount(),
            this.ordersService.getTotalSales()
        ])
            .pipe(takeUntil(this.endSubs$))
            .subscribe((values: number[]) => {
                this.statistics = values;
            });
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
