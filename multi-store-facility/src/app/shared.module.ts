import { NgModule } from '@angular/core';
import { AlertComponent } from './common-views/alert/alert-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from 'src/common/services/request-interceptor';

@NgModule({

    declarations: [
        AlertComponent
    ],
    imports: [
        CommonModule, FormsModule, BrowserModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
    ],
    exports:[AlertComponent]
})
export class SharedModule { }
