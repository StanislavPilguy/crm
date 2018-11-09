import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

import {AuthService} from "../services/auth.service";



@Injectable()
export class TokenInterceptor implements HttpInterceptor{
	constructor(private auth: AuthService,
	            private router: Router) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.auth.isAuthenticated()) {
			req = req.clone({
				setHeaders: {
					Authorization: this.auth.getToen()
				}
			})
		}
		return next.handle(req).pipe(
	  catchError((error: HttpErrorResponse) => this.hendleAuthError(error))
		)
	}
	private hendleAuthError(error: HttpErrorResponse): Observable<any> {
		if (error.status === 401) {
			this.router.navigate(['/login'], {
				queryParams: {
					sessionFailed: true
				}
			})
		}
		return throwError(error);
	}
}
