import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { UserService } from './user-service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = UserService.getUserToken();
    token = token ? ("MSF+" + token) : "";

    let reqHeaders = request.headers
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      .set('Authorization', token);

    if (request.headers.get('browserDecidedReqHeader') == 'Yes')
      reqHeaders = reqHeaders.delete('browserDecidedReqHeader');
    else if(reqHeaders.get('Content-Type')==null)
      reqHeaders = reqHeaders.set('Content-Type', 'application/json');

    const reqParams = request.clone({ headers: reqHeaders });

    return next.handle(reqParams);
  }
}
