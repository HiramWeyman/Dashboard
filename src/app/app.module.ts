import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

//rutas
import { APP_ROUTING } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './modules/default/default.module';
import { ServicesModule } from './services/services.module';
import { ShoppingcartComponent } from './modules/shoppingcart/shoppingcart.component';
import { DiscountComponent } from './modules/discount/discount.component';

import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMx, 'es-Mx');

@NgModule({
  declarations: [
    AppComponent,
    ShoppingcartComponent,
    DiscountComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    SharedModule,
    DefaultModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    BlockUIModule.forRoot(),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-MX' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
