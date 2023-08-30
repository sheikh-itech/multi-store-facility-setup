import { Component } from '@angular/core';
import { AlertService } from 'src/app/common-views/alert/alert-service';
import { Register } from 'src/common/beans/register';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { Validation } from 'src/common/utilities/validation';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'msf-user-register',
    templateUrl: './user-register.html',
    styleUrls: ['./user-register.css']
})
export class UserRegister {

    useCustomId: boolean = false;
    registerDone: boolean = false;
    privateInfo: string;
    user: Register;

    private options = {
        autoClose: true,
        autoCloseTime: 4000,
        keepAfterRouteChange: false
    };
    login = {
        emailId: "",
        userId: ""
    }

    constructor(private alert: AlertService, private http: MsfHttpService) {
        this.privateInfo = '';
        this.user = new Register();
    }

    register(): void {

        this.alert.clear();

        if(this.privateInfo != this.user.password) {
            this.alert.error('Password not matched', this.options);
            return;
        }

        let valResp = Validation.validRegister(this.user);

        if(valResp=='OK') {

            this.http.postApi(environment.register, this.user).subscribe({
                next: (resp) => {
                    if(resp.success && resp.status=="CREATED") {
                        this.user = new Register();
                        this.login.emailId = resp.data.email;
                        this.login.userId = resp.data.userId;
                        this.registerDone = true;
                    } else
                        this.alert.error(resp.message, this.options);
                },
                error: (err) => {
                    // Handle errors here
                    this.alert.error(err.error.message, this.options);
                    if(err.error.message=='Email already registered')
                        this.useCustomId = true;
                },
                complete: () => {
                    // This block is executed when the observable completes (optional)
                }
            });
        } else
            this.alert.error(valResp, this.options);
    }
}
