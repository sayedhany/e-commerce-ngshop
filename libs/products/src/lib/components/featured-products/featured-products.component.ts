import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit {
    featuredProducts: Product[] = [];
    constructor(
        private productSrv: ProductsService,
        private messageSrv: MessageService
    ) {}

    ngOnInit(): void {
        this.productSrv.getFeaturedProducts(11).subscribe((products) => {
           
            this.featuredProducts = products;
        });
    }
    onShowMessage() {
        this.messageSrv.add({
            severity: 'success',
            summary: 'success',
            detail: ' Cart is Updated'
        });
    }
}
