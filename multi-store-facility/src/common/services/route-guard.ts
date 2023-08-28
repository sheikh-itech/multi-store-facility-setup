import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, catchError, map, of, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MsfHttpService } from './msf-http-service';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard {

    private isInitialized = new Subject<boolean>();

    constructor(private http: MsfHttpService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (state.url == '/login' || state.url == '/home') {
            this.isInitialized.next(true);
            return true;
        }

        return this.http.postApi(environment.permission, state.url).pipe(
            map((resp) => {
                if (resp.success && resp.status == "ACCEPTED") {
                    this.isInitialized.next(true);
                    return true;
                } else {
                    this.isInitialized.next(false);
                    //this.router.navigate(['/accessDenied']);
                    return false;
                }
            }),
            catchError(() => {
                this.isInitialized.next(false);
                //this.router.navigate(['/accessDenied']);
                return of(false);
            }),
            shareReplay(1) // Share the observable and its emissions among subscribers
        );
    }

    waitForInitialization(): Observable<boolean> {
        
        return this.isInitialized.asObservable();
    }
}
