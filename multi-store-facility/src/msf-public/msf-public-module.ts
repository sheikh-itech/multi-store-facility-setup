import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MsfPublicViewImport } from 'src/msf-public/msf-public-import';
import { SharedModule } from 'src/app/shared.module';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { MaterialModule } from 'src/app/material-module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@NgModule({

  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule, CommonModule, AppRoutingModule, 
    SharedModule, MaterialModule
  ],

  declarations: MsfPublicViewImport.declarations,

  providers: [MatSort, MatPaginator]
})
export class MsfPublicModule { }
