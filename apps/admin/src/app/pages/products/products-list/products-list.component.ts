/* eslint-disable quotes */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@cairo/products';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Product[];
    constructor(private productSrv: ProductsService) {}

    ngOnInit(): void {
        this._getProducts();
    }
    onDelete(id: string) {}
    onUpdate(id: string) {}
    private _getProducts() {
        this.productSrv.getProducts().subscribe((products) => {
            this.products = products;
        });
    }
}
