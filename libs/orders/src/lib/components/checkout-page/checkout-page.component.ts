import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@cairo/users';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { StripeService } from 'ngx-stripe';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartSrv: CartService,
        private ordersSrv: OrdersService,
        private stripeSrv: StripeService
    ) {}
    checkoutFormGroup!: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId = '5fb3d05216a69e00246c02ee';
    countries: any[] = [];

    ngOnInit(): void {
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }
    private _getCartItems() {
        const cart: Cart = this.cartSrv.getCart();
        this.orderItems = cart.items?.map(
            (item): OrderItem => {
                return {
                    product: item.productid as string,
                    quantity: item.quantity
                };
            }
        ) as OrderItem[];
        console.log(this.orderItems);
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }

    backToCart() {
        this.router.navigate(['/cart']);
    }

    placeOrder() {
        if (this.checkoutFormGroup.invalid) {
            return;
        }
        this.isSubmitted = true;
        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm.street.value,
            shippingAddress2: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            zip: this.checkoutForm.zip.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            user: this.userId,
            status: Object.keys(ORDER_STATUS)[0],
            dateOrdered: String(Date.now())
        };
        this.ordersSrv.cashOrderData(order);
        
        this.ordersSrv
            .createCheckoutSession(this.orderItems as OrderItem[])
            .subscribe((error) => {
                console.log(error);
            });
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
