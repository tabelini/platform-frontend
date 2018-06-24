import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';
import {UserService} from './user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem(UserService.USERNAME_KEY);
    const token = localStorage.getItem(UserService.TOKEN_KEY);
    // if there is no username and password just let the request pass
    if (isNullOrUndefined(username) || isNullOrUndefined(token)) {
      return next.handle(req);
    } else {
      const tokenHeader = token;
      const authorizedReq = req.clone({headers: req.headers.set('x-token', tokenHeader)});
      return next.handle(authorizedReq);
    }
  }

}
