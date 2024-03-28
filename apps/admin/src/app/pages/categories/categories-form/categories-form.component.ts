/* eslint-disable max-len */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@cairo/products';
// import { error } from 'console';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmited: boolean;
    editMode: boolean;
    currentCategoryId: string;

    constructor(
        private formBuilder: FormBuilder,
        private categorySrv: CategoriesService,
        private messageSrv: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            icon: ['', [Validators.required]],
            color: ['#fff', [Validators.required]]
        });
        this.isSubmited = false;
        this.editMode = false;
        this._checkEditMode();
    }
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentCategoryId = params.id;
                this.categorySrv
                    .getCategory(params.id)
                    .subscribe((category) => {
                        this.categoryForm.name.setValue(category.name);
                        this.categoryForm.icon.setValue(category.icon);
                        this.categoryForm.color.setValue(category.color);
                    });
            } else {
                this.editMode = false;
            }
        });
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.form.valid) {
           
            const category: Category = this.form.value;
            if (this.editMode) {
                this._updateCategory(category);
            } else {
                this._addCategory(category);
            }
        }
    }
    private _updateCategory(category: Category) {
        this.categorySrv
            .updateCategory(category, this.currentCategoryId)
            .subscribe(
                (newCategory) => {
                    
                    this.messageSrv.add({
                        severity: 'success',
                        summary: 'success',
                        detail: 'Category is Updated'
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            // this.route.navigate(['./', 'categories']);
                            this.location.back();
                        });
                },
                () => {
                    this.messageSrv.add({
                        severity: 'error',
                        summary: 'error',
                        detail: 'Category is not Updated'
                    });
                }
            );
    }
    private _addCategory(category: Category) {
        this.categorySrv.createCategory(category).subscribe(
            (newCategory) => {
               
                this.messageSrv.add({
                    severity: 'success',
                    summary: 'success',
                    detail: `Category ${newCategory.name} is created`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        // this.route.navigate(['./', 'categories']);
                        this.location.back();
                    });
            },
            () => {
                this.messageSrv.add({
                    severity: 'error',
                    summary: 'error',
                    detail: 'Category is not created'
                });
            }
        );
    }
    get categoryForm() {
        return this.form.controls;
    }
}
