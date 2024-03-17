import { UiModule } from '@cairo/ui';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
const routes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'category/:categoryid', component: ProductsListComponent },
    { path: 'products/:productid', component: ProductPageComponent }
];
@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule,
        RatingModule,
        InputNumberModule,
        UiModule,
        RouterModule.forChild(routes),
        ButtonModule
    ],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent
    ],
    exports: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent
    ]
})
export class ProductsModule {}
