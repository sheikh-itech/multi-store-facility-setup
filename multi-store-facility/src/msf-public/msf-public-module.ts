import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MsfPublicViewImport } from 'src/msf-public/msf-public-import';


@NgModule({

  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule, CommonModule, AppRoutingModule
  ],

  declarations: MsfPublicViewImport.declarations,

  providers: []
})
export class MsfPublicModule { }
