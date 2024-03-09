import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    api = environment.apiUrl + 'orders';

    constructor(private httpClient: HttpClient) {}
    updateOrder(orderStatus, id: string) {
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
}
