import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Category } from 'src/common/beans/category';
import { Product } from 'src/common/beans/product';
import { ProductDetail } from 'src/common/beans/product-detail';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { AppConstants } from 'src/common/utilities/app-constants';
import { Utility } from 'src/common/utilities/utility';
import { Validation } from 'src/common/utilities/validation';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'qrcode-generate',
    templateUrl: './qr-code-generate.html',
    styleUrls: ['./qr-code-generate.css']
})
export class QrCodeGenerate implements OnInit {

    product: Product | any;
    generated: boolean = false;
    qrDetail: any;
    categories: Category[];
    productDietType = AppConstants.productDietType;
    weightUnits = AppConstants.weightUnits;
    private productFile: File | any = '';
    
    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };
    headerOptions = { headers: { browserDecidedReqHeader: 'Yes' } };

    constructor(private alert: AlertService, private http: MsfHttpService) {
        this.product = new Product();
        this.product.detail = new ProductDetail();
        this.categories = [];
    }

    generateQRCode(): void {

        if (!this.product) {
            this.alert.error('Name, Price & Category required', this.options);
            return;
        }

        let valResp = Validation.validProduct(this.product);
        if (valResp == 'OK') {
            let data = new FormData();
            data.set("productDetail", JSON.stringify(this.product));
            data.set("productImage", this.productFile);
            this.http.postApi(environment.qrGenerate, data, this.headerOptions).subscribe({
                next: (resp) => {
                    if (resp.success && resp.status == "CREATED") {
                        this.generated = true;
                        this.qrDetail = resp.data;
                        this.product = new Product();
                    } else
                        this.alert.error(resp.message, this.options);
                },
                error: (err) => {
                    // Handle errors here
                    this.alert.error(err.error.message, this.options);
                }
            });
        } else
            this.alert.error(valResp, this.options);
    }

    selectedFile(event: any) {

        let temp = event.target.files.item(0);
        if(!temp.name.endsWith('.jpg') && !temp.name.endsWith('.jpeg')) {
            Utility.scrollTop();
            this.alert.warn('Only jpg or jpeg images allowed', this.options);
            return;
        }
        this.productFile = event.target.files.item(0);
    }

    ngOnInit(): void {

        this.http.getApi(environment.categorySearchAll).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "OK")
                    this.categories = resp.data;
                else
                    this.categories = [];
            },
            error: (err) => {
                this.categories = [];
            }
        });
    }
}
