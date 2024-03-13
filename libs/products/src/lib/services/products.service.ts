import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
// import { Product } from '../products.module';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    api = environment.apiUrl + 'products';
    updateProduct(product: Product, id: string) {
        return this.httpClient.put<Product>(
            `${this.api}products/` + id,
            product
        );
    }
    constructor(private httpClient: HttpClient) {}
    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.api}`);
    }
    getProduct(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.api}/` + id);
    }
    createProduct(product: Product): Observable<Product> {
        return this.httpClient.post<Product>(`${this.api}`, product);
    }

    deleteProduct(id: string): Observable<unknown> {
        return this.httpClient.delete(`${this.api}/` + id);
    }
    getProductsCount(): Observable<number> {
        return this.httpClient
            .get<number>(`${this.api}/get/count`)
            .pipe(map((objectValue: any) => objectValue.productCount));
    }
    getFeaturedProducts(count: number): Observable<Product[]> {
        return this.httpClient.get<Product[]>(
            `${this.api}/get/featured/${count}`
        );
    }
}
