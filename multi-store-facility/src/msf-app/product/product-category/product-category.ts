import { Component } from '@angular/core';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Category } from 'src/common/beans/category';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'product-category',
    templateUrl: './product-category.html',
    styleUrls: ['./product-category.css']
})
export class ProductCategory {

    activePanel: string = 'addNew';
    category: Category;
    categoryName: string = '';
    categoryDetail: any = [];

    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };

    constructor(private alert: AlertService, private http: MsfHttpService) {
        this.category = new Category();
    }

    AddCategory(): void {

        this.activePanel = 'addNew';
        if (!this.category.name || this.category.name.length < 3) {
            this.alert.warn('Name of length 3 required', this.options);
            return;
        }
        if (!this.category.desc || this.category.desc.length < 10) {
            this.alert.warn('Desc of length 10 required', this.options);
            return;
        }
        this.http.postApi(environment.category, this.category).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "CREATED") {
                    this.category = new Category();
                    this.alert.success(resp.message, this.options);
                } else
                    this.alert.warn(resp.message, this.options);
            },
            error: (err) => {
                // Handle errors here
                this.alert.error(err.error.message, this.options);
            }
        });
    }

    searchCategory(): void {

        this.activePanel = 'viewOne';

        if (!this.categoryName || this.categoryName.length < 3) {
            this.alert.warn('Category name required', this.options);
            return;
        }

        this.getApiData(environment.categorySearch + this.categoryName);
    }

    searchAllCategory(): void {

        this.activePanel = 'viewAll';

        this.getApiData(environment.categorySearchAll);
    }

    private getApiData(url: string) {

        this.http.getApi(url).subscribe({
            next: (resp) => {
                if (resp.success && resp.status == "OK") {
                    this.categoryDetail = resp.data;
                } else {
                    this.categoryDetail = [];
                    this.alert.warn(resp.message, this.options);
                }
            },
            error: (err) => {
                this.categoryDetail = [];
                this.alert.error(err.error.message, this.options);
            }
        });
    }
}
