import { Component, OnInit } from '@angular/core';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'msf-user-detail',
    templateUrl: './user-detail.html',
    styleUrls: ['./user-detail.css']
})
export class UserDetail implements OnInit {

    constructor(private http: MsfHttpService) {

    }

    ngOnInit(): void {
        this.http.postApi(environment.userDetail, null).subscribe({
            next: (resp) => {
                console.log(resp)
            },
            error: (err) => {
                console.log(err)
            }
        });
    }
}
