import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartComponent } from './pages/cart/cart.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
export const ordersRoutes: Route[] = [
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'checkout',
        component: CheckoutPageComponent
    },
    {
        path: 'success',
        component: ThankYouComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        FormsModule,

        InputNumberModule,
        InputMaskModule,
        DropdownModule,
        ReactiveFormsModule,
        RouterModule.forChild(ordersRoutes),
        RouterModule
    ],
    declarations: [
        CartIconComponent,
        CheckoutPageComponent,
        CartComponent,
        ThankYouComponent,
        OrderSummaryComponent
    ],
    exports: [CartIconComponent, CartComponent, ThankYouComponent]
})
export class OrdersModule {
    constructor(cartSrv: CartService) {
        cartSrv.initCartLocalStorage();
    }
}
