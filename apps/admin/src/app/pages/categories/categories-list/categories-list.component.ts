import { Category } from '@cairo/products';
import { CategoriesService } from '@cairo/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    id: string;
    endSubs$: Subject<unknown> = new Subject();
    constructor(
        private categoryService: CategoriesService,
        private messageSrv: MessageService,
        private route: Router,
        private confirmationSrv: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getCategories();
    }
    onDelete(id: string) {
        this.confirmationSrv.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.categoryService.deleteCategory(id).subscribe(
                    () => {
                        // this.categories.filter((category) => category.id !== id);
                        this.getCategories();
                        this.messageSrv.add({
                            severity: 'success',
                            summary: 'success',
                            detail: 'the category is deleted'
                        });
                    },
                    () => {
                        this.messageSrv.add({
                            severity: 'error',
                            summary: 'error',
                            detail: 'Category is not deleted'
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
    onUpdate(id: string) {
        this.route.navigateByUrl(`categories/form/${id}`);
    }
    private getCategories() {
        this.categoryService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories: Category[]) => {
                this.categories = categories;
            });
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
