import { UiModule } from '@cairo/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@cairo/products';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@cairo/orders';
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];
@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,

        HeaderComponent,
        FooterComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AccordionModule,
        HttpClientModule,
        UiModule,
        ProductsModule,
        OrdersModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
