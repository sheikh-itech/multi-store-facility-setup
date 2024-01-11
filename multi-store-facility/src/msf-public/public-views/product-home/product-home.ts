import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'product-home',
    templateUrl: './product-home.html',
    styleUrls: ['./product-home.css']
})
export class ProductHome implements OnInit {

    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };

    productsInfo = [] as any;

    constructor(private http: MsfHttpService, private alert: AlertService) { }


    ngOnInit(): void {
        this.searchProducts(environment.productSearchAll);
    }

    private searchProducts(url: string, options?: any): void {

        this.http.getApi(url, options).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "OK") {
                    for(let i=0; i<resp.data.length; i++) {
                        this.productsInfo.push(resp.data[i]);
                        this.loadProductImage(resp.data[i].detail.imagePath, this.productsInfo[i]);
                    }
                }
            },
            error: (err) => {
                this.alert.error('Opps! Something went wrong...', this.options);
            }
        });
    }

    private loadProductImage(imageDir: string, product: any) {

        this.http.postApi(environment.productImage, imageDir, { responseType: 'blob' }).subscribe({
            next: (data) => {
                const reader = new FileReader();
                reader.onload = () => {
                    product.imageUrl = reader.result as string;
                };
                reader.readAsDataURL(data);
            },
            error: (err) => {
                let imageName = imageDir.substring(imageDir.indexOf('/')+1);
                console.log('Failed to load image: '+imageName);
            }
        });
    }
}
