import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    api = environment.apiUrl + 'orders';
    apiProducts = environment.apiUrl + 'products';

    constructor(
        private httpClient: HttpClient,
        private stripeSrv: StripeService
    ) {}
    updateOrder(orderStatus: string, id: string) {
        return this.httpClient.put<Order>(`${this.api}/` + id, {
            status: orderStatus
        });
    }
    getOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(`${this.api}`);
    }
    getOrder(id: string): Observable<Order> {
        return this.httpClient.get<Order>(`${this.api}/` + id);
    }
    createOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>(`${this.api}`, order);
    }

    deleteOrder(id: string): Observable<unknown> {
        return this.httpClient.delete(`${this.api}/` + id);
    }
    getOrdersCount(): Observable<number> {
        return this.httpClient
            .get<number>(`${this.api}/get/count`)
            .pipe(map((objectValue: any) => objectValue.orderCount));
    }
    getTotalSales(): Observable<number> {
        return this.httpClient
            .get<number>(`${this.api}/get/totalsales`)
            .pipe(map((objectValue: any) => objectValue.totalSales));
    }
    getProduct(id: string): Observable<any> {
        return this.httpClient.get<any>(`${this.apiProducts}/` + id);
    }
    createCheckoutSession(orderItem: OrderItem[]) {
        return this.httpClient
            .post(`${this.api}/create-checkout-session`, orderItem)
            .pipe(
                switchMap((session: any) => {
                    this.cashSession(session.id);
                    return this.stripeSrv.redirectToCheckout({
                        sessionId: session.id
                    });
                })
            );
    }
    cashOrderData(order: Order) {
        localStorage.setItem('orderData', JSON.stringify(order));
    }
    getOrderData(): Order {
        return JSON.parse(localStorage.getItem('orderData') as string) as Order;
    }
    removeCashedOrderedData() {
        localStorage.removeItem('orderData');
    }
    cashSession(sessionId: string) {
        localStorage.setItem('session', JSON.stringify(sessionId) as string);
    }
    removeSession() {
        localStorage.removeItem('session');
    }
    getSession() {
        return localStorage.getItem('session');
    }
}
