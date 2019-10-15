import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True") {
            return next.handle(req.clone());
        }
        console.log(1)
 
        if (localStorage.getItem('jwt:token') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('jwt:token'))
            });

            return next.handle(clonedreq).pipe(
                tap(
                    succ => { }, 
                    err => {
                        if (err.status === 401) {
                            localStorage.removeItem('jwt:token');
                            this.router.navigateByUrl('/login');
                        }
                    })
              );
        }

        return next.handle(req.clone());
    }
}