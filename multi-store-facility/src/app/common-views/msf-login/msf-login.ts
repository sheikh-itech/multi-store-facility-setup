import { Component, OnInit } from '@angular/core';
import { Login } from 'src/common/beans/login';
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
export class MsfLogin implements OnInit {

    login: Login;

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    constructor(private http: MsfHttpService, private alert: AlertService, private router: Router) {
        this.login = new Login();
    }

    ngOnInit(): void {

        let principal = UserService.getUserToken();

        if(principal && principal.length>100) {

            this.http.postApi(environment.validate, null).subscribe({
                next: (resp) => {
                    if(resp.success && resp.status=='OK')
                        this.router.navigate(['/home']);
                    else
                        this.router.navigate(['/login']);
                },
                error: (err) => {
                    this.router.navigate(['/login']);
                },
                complete: () => {
                    // This block is executed when the observable completes (optional)
                }
            }); 
        }
    }

    publicInfo(): void {

        this.router.navigate(['/msf']);
    }

    signIn(): void {

        if (Validation.validate(this.login)) {

            this.http.postApi(environment.authenticate, this.login).subscribe({
                next: (resp) => {
                    if(resp.success && resp.status=="ACCEPTED") {
                        this.router.navigate(['/home']);
                        UserService.setUserDetail(resp.data, this.login.remember);
                    } else
                        this.alert.error(resp.message, this.options);
                },
                error: (err) => {
                    if(err.message.indexOf('http')>0)
                        this.alert.error('Multi store facility not responding', this.options);
                    else
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
