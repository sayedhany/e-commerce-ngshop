import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    categories: Category[] = [];
    endSub$: Subject<any> = new Subject();
    constructor(
        private productSrv: ProductsService,
        private categorySrv: CategoriesService
    ) {}

    ngOnInit(): void {
        this._getProducts();
        this._getCategories();
    }
    categoryFilter() {
        const selectedCategories = this.categories
            .filter((category) => category.checked)
            .map((category) => category.id);
        this._getProducts(selectedCategories as string[]);
    }
    private _getProducts(categoriesFilter?: string[]) {
        this.productSrv
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.endSub$))
            .subscribe((products) => {
                this.products = products;
            });
    }
    private _getCategories() {
        this.categorySrv
            .getCategories()
            .pipe(takeUntil(this.endSub$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }
    ngOnDestroy(): void {
        this.endSub$.next();
        this.endSub$.complete();
    }
}
