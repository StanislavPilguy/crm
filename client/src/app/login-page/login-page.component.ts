import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";
import {MaterialService} from "../shared/classes/material.service";



@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

	public form: FormGroup;

	private aSub: Subscription;

	constructor(private auth: AuthService,
							private router: Router,
							private route: ActivatedRoute) {
	}
	ngOnInit() {
		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(8)])
		});

		this.route.queryParams.subscribe((params: Params) => {
			if (params['registered']) {
				MaterialService.toast('Теперь вы можете войти в систему используя свои данные')
			} else if (params['accessDenied']) {
				MaterialService.toast('Для начала авторизуйтесь в системе')
			} else if (params['sessionFailed']) {
				MaterialService.toast('Пожалуйста, войдите в систему заново.')
			}
		})
	}

	ngOnDestroy() {
		if (this.aSub) {
			this.aSub.unsubscribe()
		}
	}

	onSubmit() {
		this.form.disable();
		this.aSub = this.auth.login(this.form.value)
			.subscribe(() => this.router.navigate(['/overview']),
				error => {
					MaterialService.toast(error.error.message);
					this.form.enable()
				}
		)
	}

}