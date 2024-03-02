import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    updateCategory(category: Category, id: any) {
        return this.httpClient.put<Category>(
            'http://localhost:3000/api/v1/categories/' + id,
            category
        );
    }
    constructor(private httpClient: HttpClient) {}
    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(
            'http://localhost:3000/api/v1/categories'
        );
    }
    getCategory(id: string): Observable<Category> {
        return this.httpClient.get<Category>(
            'http://localhost:3000/api/v1/categories/' + id
        );
    }
    createCategory(category: Category): Observable<Category> {
        return this.httpClient.post<Category>(
            'http://localhost:3000/api/v1/categories',
            category
        );
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    deleteCategory(id: string): Observable<Object> {
        return this.httpClient.delete(
            'http://localhost:3000/api/v1/categories/' + id
        );
    }
}
