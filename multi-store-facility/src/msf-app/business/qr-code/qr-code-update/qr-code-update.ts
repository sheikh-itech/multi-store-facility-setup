import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Product } from 'src/common/beans/product';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { environment } from 'src/environments/environment';

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

    applyFilter(event: any) {

    }

    ngOnInit(): void {

        this.http.getApi(environment.allQrCode).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "OK") {

                    resp.data.forEach((info: any) => {
                        const byteCharacters = atob(info.qrBytes);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = Array.from(byteNumbers);
                        const base64Image = 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, byteArray));
                        info.imageUrl = base64Image;
                    });

                    const users = Array.from(resp.data, (data) => this.createUser(data));
                    this.dataSource = new MatTableDataSource(users);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.categories = [];
                }
            },
            error: (err) => {
                this.categories = [];
            }
        });
    }

    createUser(data: any): UserData {

        return {
          name: data.name,
          price: data.price,
          category: data.category,
          desc: data.desc,
          code: data.code,
          id: data.id,
          imageUrl: data.imageUrl
        };
      }
}

export class UserData {
    id?: string;
    name?: string;
    price?: number;
    category?: string;
    desc?: string;
    code?: string;
    imageUrl?: any;
}

export function CustomPaginator() {

    return new MatPaginatorIntl().itemsPerPageLabel = 'Show entries ';
}