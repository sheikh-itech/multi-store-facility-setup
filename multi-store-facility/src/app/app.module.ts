import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MultiStoreFacility } from './multi-store-facility';
import { FormsModule } from '@angular/forms';
import { MsfLogin } from './common-views/msf-login/msf-login';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './common-views/alert/alert-component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from 'src/common/services/request-interceptor';
import { MsfModule } from 'src/msf-app/msf-module';
import { MsfPublicModule } from 'src/msf-public/msf-public-module';

@NgModule({

    declarations: [
        MultiStoreFacility, MsfLogin, AlertComponent
    ],
    imports: [
        BrowserModule, CommonModule, FormsModule, MsfModule, AppRoutingModule, HttpClientModule,
        MsfPublicModule
    ],
    providers: [/*RouteChangeService,*/

        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
    ],
    bootstrap: [MultiStoreFacility]
})
export class AppModule { }
