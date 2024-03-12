/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@cairo/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    isSubmited: boolean;
    categories: Category[];
    editMode: boolean;
    imageDisplay: string | ArrayBuffer;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private categorySrv: CategoriesService
    ) {}

    ngOnInit(): void {
        this._initForm();
        this.isSubmited = false;
        this.editMode = false;
        this._getCategories();
    }
    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            brand: ['', [Validators.required]],
            price: ['', [Validators.required]],
            category: ['', [Validators.required]],
            countInStock: ['', [Validators.required]],
            description: ['', [Validators.required]],
            richDescription: [''],
            image: [''],
            isFeatured: ['']
        });
    }
    private _getCategories() {
        this.categorySrv
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }
    onSubmit() {
        console.log(this.form.value);
    }
    onImageUpload($event: any) {
        const file = $event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }
    get productForm() {
        return this.form.controls;
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
