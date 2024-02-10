import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public userSer:UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    var tokenReq=req.clone({
      setHeaders:{
        'myauthtoken':this.userSer.getMyToken()?this.userSer.getMyToken():''
      }
    })
      return next.handle(tokenReq);
  }
}
