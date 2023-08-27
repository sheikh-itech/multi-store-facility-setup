import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsfHttpService } from 'src/common/services/msf-http-service';
import { MsfSidebarService } from 'src/common/services/msf-sidebar-service';
import { UserService } from 'src/common/services/user-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'multi-store-facility',
    templateUrl: './multi-store-facility.html',
    styleUrls: ['./multi-store-facility.css']
})
export class MultiStoreFacility implements OnInit, AfterViewInit {

    //Do not un-comment RouteChangeService, it will do same what RouteGuard do
    
    constructor(private router: Router, /*private routeChange: RouteChangeService,*/
        private sidebarService: MsfSidebarService, private http: MsfHttpService) {
        
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
                    // Handle errors here
                    this.router.navigate(['/login']);
                },
                complete: () => {
                    // This block is executed when the observable completes (optional)
                }
            }); 
        } else
            this.router.navigate(['/public']);
    }

    ngAfterViewInit(): void {

        let event: any = {
            target:{
                window:{
                    innerWidth: window.innerWidth
                }
            }
        };
        this.sidebarService.resetView(event);
    }

    @HostListener('window:resize', ['$event'])
    private onWindowResize(event: Event): void {

        this.sidebarService.resetView(event);
    }
}
