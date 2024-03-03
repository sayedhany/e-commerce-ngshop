import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    api = environment.apiUrl + 'categories';
    updateCategory(category: Category, id: string) {
        return this.httpClient.put<Category>(
            `${this.api}categories/` + id,
            category
        );
    }
    constructor(private httpClient: HttpClient) {}
    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.api}`);
    }
    getCategory(id: string): Observable<Category> {
        return this.httpClient.get<Category>(`${this.api}/` + id);
    }
    createCategory(category: Category): Observable<Category> {
        return this.httpClient.post<Category>(`${this.api}`, category);
    }

    deleteCategory(id: string): Observable<unknown> {
        return this.httpClient.delete(`${this.api}/` + id);
    }
}
