import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subject, filter, take } from 'rxjs';
import { MsfHttpService } from './msf-http-service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RouteChangeService {

    private oldUrl: string;
    private isInitialized = new Subject<boolean>();

    constructor(private router: Router, private http: MsfHttpService) {
        this.oldUrl = "";
        this.initRouteChangeHandler();
    }

    /**
     *  Challenge with route change event is-
     *  This do not prevent to navigate non-authorised url
     */
    private initRouteChangeHandler() {

        this.router.events
            .pipe(filter((event: Event) => event instanceof NavigationEnd || event instanceof NavigationStart))
            .subscribe(async (event: any) => {

                if (event instanceof NavigationStart) {
                    this.oldUrl = this.router.url;
                    return;
                }

                if(event.url=='/login' || event.url=='/home')
                    return;

                await this.http.postApi(environment.permission, event.url)
                    .pipe(take(1)) // Automatically unsubscribe after the first emission
                    .subscribe({
                        next: (response) => {
                            if (response.success && response.status === "ACCEPTED") {
                                this.isInitialized.next(true);
                            } else {
                                this.router.navigate([this.oldUrl]);
                                this.isInitialized.next(false);
                            }
                        },
                        error: (err) => {
                            this.router.navigate([this.oldUrl]);
                            this.isInitialized.next(false);
                        }
                    });
            });
    }

    waitForInitialization(): Observable<boolean> {
        return this.isInitialized.asObservable();
    }
}
