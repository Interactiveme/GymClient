import {HttpInterceptor,HttpErrorResponse,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { StateService } from '../services/state-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
         private cookieService: CookieService,
         public stateService:StateService
    )     
    { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        console.log(err.status, err.statusText, "joseph is awesome");
        if (err.status === 401 || err.status === 403) {
            console.log(this);
            //navigate /delete cookies or whatever
//            this.router.navigateByUrl(`/login`);
//            this.router.navigate(['/login']);
  
            this.stateService.logout();

            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return Observable.of(err.message);
        }
        return Observable.throw(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
        const cookieExists: boolean = this.cookieService.check('tokenKey');
        let token = "";
        if(cookieExists){
            token = this.cookieService.get("tokenKey");

        }
        const authReq = req.clone({headers: req.headers.set("x-access-token", token)});
        // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
        return next.handle(authReq).catch( error => {
           return this.handleAuthError(error);
          });
    }
}