import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {UserState} from "../store/user.state";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private UserState: UserState) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  /*  if () {
      const token = await firstValueFrom(this.UserState.getUserToken())
      const authReq = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
      // Передаем измененный запрос дальше по цепочке обработчиков
      return next.handle(authReq);
    }*/

    // Если добавлять токен не нужно, просто передаем исходный запрос
    return next.handle(req);
  }
}
