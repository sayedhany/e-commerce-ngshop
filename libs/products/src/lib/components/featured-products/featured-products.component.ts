import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit {
    featuredProducts: Product[] = [];
    constructor(private productSrv: ProductsService) {}

    ngOnInit(): void {
        this.productSrv.getFeaturedProducts(11).subscribe((products) => {
            console.log(products);
            this.featuredProducts = products;
        });
    }
}
