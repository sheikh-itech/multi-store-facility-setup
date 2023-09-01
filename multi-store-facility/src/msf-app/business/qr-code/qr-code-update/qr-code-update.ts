import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Product } from 'src/common/beans/product';
import { MsfHttpService } from 'src/common/services/msf-http-service';

@Component({
    selector: 'qr-code-update',
    templateUrl: './qr-code-update.html',
    styleUrls: ['./qr-code-update.css']
})
export class QrCodeUpdate implements OnInit {

    updateQrInfo: boolean = false;
    product: Product;
    categories: any = [];

    displayedColumns: string[] = ['Name', 'Price', 'Category', 'Desc', 'Id', 'Code'];
    dataSource: MatTableDataSource<UserData>;
    private response: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };

    constructor(private alert: AlertService, private http: MsfHttpService,
        private pagin: MatPaginator, private srt: MatSort) {
        this.product = new Product();
        this.dataSource = new MatTableDataSource<UserData>();
        this.paginator = pagin;
        this.sort = srt;
    }

    ngOnInit(): void {

    }
}

export class UserData {
    id?: string;
    name?: string;
    price?: number;
    category?: string;
    desc?: string;
    code?: string;
}

export function CustomPaginator() {

    return new MatPaginatorIntl().itemsPerPageLabel = 'Show entries ';
}