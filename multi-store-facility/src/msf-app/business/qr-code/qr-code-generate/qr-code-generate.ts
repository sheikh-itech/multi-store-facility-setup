import { Component } from '@angular/core';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Product } from 'src/common/beans/product';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { Validation } from 'src/common/utilities/validation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'qrcode-generate',
  templateUrl: './qr-code-generate.html',
  styleUrls: ['./qr-code-generate.css']
})
export class QrCodeGenerate {
    
    product: Product;
    generated: boolean = false;
    qrDetail: any;

    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };

    constructor(private alert: AlertService, private http: MsfHttpService) {
        this.product = new Product();
    }

    generateQRCode(): void {

        if(!this.product) {
            this.alert.error('Name & Price required', this.options);
            return;
        }

        let valResp = Validation.validProduct(this.product);
        if(valResp=='OK') {

            this.http.postApi(environment.qrGenerate, this.product).subscribe({
                next: (resp) => {
                    if(resp.success && resp.status=="CREATED") {
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
}
