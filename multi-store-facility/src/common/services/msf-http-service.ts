import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MsfMaskService } from './msf-mask-service';

@Injectable({
  providedIn: 'root'
})
export class MsfHttpService {

  constructor(private http: HttpClient, private router: Router, private mask: MsfMaskService) { 

  }

  /**
   * @param url- actual api url eg- http://<host>:<port>/example/test
   * @param body- Actuat data that api specifies
   * @param options- Optional, it holds headers, params etc
   * @returns actual api response
   */
  public postApi(url: string, body: any, options?: any): Observable<any> {
    this.mask.show(true);
    return this.http.post<any>(url, body, options)
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.show(false);
          return response;
      })
    );
  }

  /**
   * @param url- actual api url eg- http://<host>:<port>/example/test
   * @param options- Optional, it holds headers, params etc 
   * @returns actual api response
   */
  public getApi(url: string, options?: any): Observable<any> {
    this.mask.show(true);
    return this.http.get<any>(url, options)
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.show(false);
          return response;
        })
    );
  }

  /**
   * @param url- actual api url eg- http://<host>:<port>/example/test
   * @param body- Actuat data that api specifies
   * @param options- Optional, it holds headers, params etc
   * @returns actual api response
   */
  public patchApi(url: string, body: any, options?: any): Observable<any> {
    this.mask.show(true);
    return this.http.patch<any>(url, body, options)
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.show(false);
          return response;
        })
    );
  }

  /**
   *  Common place to handle specific scenarios only
   * 
   * @param error- error object which api returns
   * @returns- returns back same error to caller
   */
  private handleError(error: HttpErrorResponse) {
    this.mask.show(false);
    // Api returned an unsuccessful response
    if (error.error == 'Incorrect username or password' || error.error.error == 'Unauthorized') {
        
      this.enableLogin();
    } else if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }
    // Return same error message
    return throwError(() => error);
  }

  private enableLogin() {

    this.router.navigate(['/login'], { queryParams: {} });
  }
}
