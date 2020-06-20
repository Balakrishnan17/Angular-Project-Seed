import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector:Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);

    const clonedRequest = request.clone({
      headers: auth.getTokenHeader(),
      url: this.fixUrl(request.url)
    });

    return next.handle(clonedRequest);
  }

  private fixUrl(url: string) {
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.API_ADDRESS + url;
    }
  }
}
