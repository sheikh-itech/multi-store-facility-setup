import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Category } from 'src/common/beans/category';
import { Product } from 'src/common/beans/product';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { AppConstants } from 'src/common/utilities/app-constants';
import { EncDecUtil } from 'src/common/utilities/enc-dec-util';
import { Utility } from 'src/common/utilities/utility';
import { Validation } from 'src/common/utilities/validation';
import { ZXingQrImageReader } from 'src/common/utilities/zxing-qr-image-reader';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'qr-code-update',
    templateUrl: './qr-code-update.html',
    styleUrls: ['./qr-code-update.css']
})
export class QrCodeUpdate {

    updateQrInfo: boolean = false;
    product: Product;
    orgProduct: any;
    categories: Category[];
    qrName: any;

    productDietType = AppConstants.productDietType;
    weightUnits = AppConstants.weightUnits;

    displayedColumns: string[] = ['Name', 'Price', 'Category', 'Desc', 'Info', 'Id', 'Image', 'Code', 'Update'];
    dataSource: MatTableDataSource<UserData>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };

    constructor(private alert: AlertService, private http: MsfHttpService, private qrRead: ZXingQrImageReader,
        private pagin: MatPaginator, private srt: MatSort) {

        this.categories = [];
        this.product = new Product();
        this.dataSource = new MatTableDataSource<UserData>();
        this.paginator = pagin;
        this.sort = srt;
    }

    cancel(): void {
        this.updateQrInfo = false;
    }

    searchQrByName(): void {

        if (!this.qrName) {
            this.alert.warn('Product name needed', this.options);
            return;
        }
        this.searchQrCodes(environment.qrSearchByName + this.qrName);
    }

    searchAllQr(): void {

        this.searchQrCodes(environment.allQrCode);
    }

    updateQrDetail() {

        if (!this.product) {
            this.alert.error('Name, Price & Category required', this.options);
            return;
        }

        let isEqual = Utility.deepObjectsEquality(this.orgProduct, this.product, ['imageUrl']);

        if (isEqual) {
            this.alert.warn('No update found', this.options);
            return;
        }

        let valResp = Validation.validProduct(this.product);
        if (valResp == 'OK') {

            this.product.verified = false;

            this.http.patchApi(environment.qrUpdate, this.product).subscribe({
                next: (resp) => {
                    if (resp.success && resp.status == "CREATED") {
                        this.product = new Product();
                        this.alert.success('Qr info updated', this.options);
                        this.updateQrInfo = false;
                        this.orgProduct.verified = false;
                    } else
                        this.alert.error(resp.message, this.options);
                },
                error: (err) => {
                    this.alert.error(err.error.message, this.options);
                }
            });
        } else
            this.alert.error(valResp, this.options);
    }

    verifyQrImage(product: any): void {

        if (product.verified)
            return;

        this.qrRead.readQrImage(product.qrImageUrl)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {

                    if (resp === null) {
                        this.alert.warn('Verification failed, Please update Or re-generate', this.options);
                        return;
                    }

                    let allInfoValid = true;
                    resp.forEach((data: any) => {
                        if (data.key === 'price') {
                            if (product[data.key].toString().indexOf('.') < 0 && (data.value != product[data.key])) {
                                let trail = product[data.key].toString().substr(product[data.key].toString().indexOf('.'));
                                if (product[data.key].toString() != product[data.key] + trail)
                                    allInfoValid = false;
                            }
                            else if (data.value != product[data.key])
                                allInfoValid = false;
                        } else
                            if (data.value != product[data.key])
                                allInfoValid = false;
                    })
                    if (allInfoValid)
                        this.markQrVerified(product);
                },
                error: (err) => {
                    this.alert.error('Failed to verify Qr info', this.options);
                }
            });
    }

    private markQrVerified(product: any) {

        this.http.patchApi(environment.qrVerify + product.id + '/true', null).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "ACCEPTED") {
                    product.verified = true;
                } else {
                    this.alert.error(resp.message, this.options);
                }
            },
            error: (err) => {
                this.alert.error('Failed to verify Qr info', this.options);
            }
        });
    }

    updateDetail(product: any): void {

        this.product = JSON.parse(JSON.stringify(product));
        this.orgProduct = product;
        delete (this.product as any)['imageUrl'];
        this.updateQrInfo = true;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    applyFilter(event: any) {

        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    private initCategories(): void {

        this.http.getApi(environment.categorySearchAll).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "OK") {
                    this.categories = resp.data;
                } else {
                    this.categories = [];
                }
            },
            error: (err) => {
                this.categories = [];
            }
        });
    }

    private searchQrCodes(url: string, options?: any): void {

        this.http.getApi(url, options).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "OK") {
                    this.initCategories();
                    const users = Array.from(resp.data, (data) => this.createUser(data));
                    this.dataSource = new MatTableDataSource(users);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.qrName = '';
                }
            },
            error: (err) => {
                this.alert.error('Failed to search qr info', this.options);
            }
        });
    }

    createUser(data: any): UserData {

        let userData =  {
            name: data.name,
            price: data.price,
            category: data.category,
            desc: data.desc,
            detail: data.detail,
            id: data.id,
            verified: data.verified,
            qrImageUrl: EncDecUtil.bytesToBase64ImageConvert(data.qrBytes),
            imageUrl: null
        };
        if(data.imageBytes!=null)
            this.loadProductImage(data.imageDir, userData);

        return userData;
    }

    private loadProductImage(imageDir: string, userData: any) {
        this.http.postApi(environment.productImage, imageDir, { responseType: 'arraybuffer' }).subscribe({
            next: (data) => {
                const reader = new FileReader();
                reader.onload = () => {
                    userData.imageUrl = reader.result as string;
                };
                reader.readAsDataURL(new Blob([data]));
            },
            error: (err) => {
                let imageName = imageDir.substring(imageDir.indexOf('/')+1);
                this.alert.error('Failed to load image: '+imageName, this.options);
            }
        });
    }
}

export class UserData {
    id?: string;
    name?: string;
    price?: number;
    category?: string;
    desc?: string;
    detail?: any;
    update?: boolean;
    qrImageUrl?: any;
    imageUrl?: any;
    verified?: boolean;
}

export class CustomPaginator extends MatPaginatorIntl {

    override itemsPerPageLabel: string = 'Show entries';
}

/*
export function CustomPaginator() {

    return new MatPaginatorIntl().itemsPerPageLabel = 'Show entries ';
}*/