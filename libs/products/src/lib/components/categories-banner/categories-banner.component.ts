import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endsubs$: Subject<any> = new Subject<any>();
    constructor(private categorySrv: CategoriesService) {}

    ngOnInit(): void {
        this.categorySrv
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
                this.categories = categories;
                console.log(categories);
            });
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }
}
