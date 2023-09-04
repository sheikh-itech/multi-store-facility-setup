import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { MultiStoreFacility } from './multi-store-facility';
import { FormsModule } from '@angular/forms';
import { MsfLogin } from './common-views/msf-login/msf-login';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MsfModule } from 'src/msf-app/msf-module';
import { MsfPublicModule } from 'src/msf-public/msf-public-module';
import { SharedModule } from './shared.module';
import { MaterialModule } from './material-module';

@NgModule({

    declarations: [
        MultiStoreFacility, MsfLogin
    ],
    imports: [
        BrowserModule, CommonModule, FormsModule, MsfModule, AppRoutingModule, HttpClientModule,
        MsfPublicModule, SharedModule, MaterialModule
    ],
    providers: [/*RouteChangeService,*/],
    bootstrap: [MultiStoreFacility]
})
export class AppModule { }
