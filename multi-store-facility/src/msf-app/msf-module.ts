import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MsfViewImport } from 'src/msf-app/msf-view-import';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@NgModule({

  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule, CommonModule, AppRoutingModule
  ],

  declarations: MsfViewImport.declarations,

  providers: []
})
export class MsfModule { }
