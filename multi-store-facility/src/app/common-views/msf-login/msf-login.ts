import { Component } from '@angular/core';
import { User } from 'src/common/beans/user';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { Validation } from 'src/common/utilities/validation';
import { AlertService } from '../alert/alert-service';
import { UserService } from 'src/common/services/user-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'msf-login',
    templateUrl: './msf-login.html',
    styleUrls: ['./msf-login.css']
})
export class MsfLogin {

    user: User;

    private options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(private http: MsfHttpService, private alert: AlertService, private route: Router) {
        this.user = new User();
    }

    login(): void {

        if (Validation.validate(this.user)) {

            this.http.postApi(environment.authenticate, this.user).subscribe({
                next: (resp) => {
                    if(resp.success && resp.status=="ACCEPTED") {
                        this.route.navigate(['/home']);
                        UserService.setUserDetail(resp.data, this.user.remember);
                    } else
                        this.alert.error(resp.message, this.options);
                },
                error: (err) => {
                    // Handle errors here
                    this.alert.error(err.message, this.options);
                },
                complete: () => {
                    // This block is executed when the observable completes (optional)
                }
            });

        } else {
            this.alert.error('Username, Password required', this.options);
            return;
        }
    }
}
