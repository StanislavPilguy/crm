import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {User} from "../interfaces";
import {tap} from "rxjs/internal/operators";



@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private token = null;

  constructor(private _http: HttpClient) {
	}

	register(user: User): Observable<User> {
  	return this._http.post<User>('/api/auth/register', user)
	}



	login(user: User):Observable<{token: string}> {
	  return this._http.post<{token: string}>('/api/auth/login', user)
			.pipe(
				tap(
					({token}) => {
						localStorage.setItem('auth-token', token);
						this.setToken(token)
					}
				)
			)

	}
	setToken(token: string) {
  	this.token = token;
	}

	getToen(): string {
  	return this.token
	}

	isAuthenticated(): boolean {
  	return !!this.token
	}

	logout() {
  	this.setToken(null);
		localStorage.clear()
	}

}