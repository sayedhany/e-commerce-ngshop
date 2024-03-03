/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@cairo/products';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    form: FormGroup;
    isSubmited: boolean;
    categories: Category[];
    editMode: boolean;
    imageDisplay: string | ArrayBuffer;

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
        this.categorySrv.getCategories().subscribe((categories) => {
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
}
