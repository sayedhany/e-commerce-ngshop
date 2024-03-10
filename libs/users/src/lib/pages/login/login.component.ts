import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    errorMessage = 'Email or Password are wrong';
    isLodaing = false;

    constructor(
        private formBuilder: FormBuilder,
        private authSrv: AuthService,
        private route: Router,
        private localStorageSrv: LocalStorageService
    ) {}

    ngOnInit(): void {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    onSubmit() {
        this.isSubmitted = true;
        // throw new Error('Method not implemented.');
        const loginData = {
            email: this.loginForm.email.value,
            password: this.loginForm.password.value
        };
        if (this.loginFormGroup.valid) {
            this.errorMessage = '';
            this.isLodaing = true;
            this.authSrv.login(loginData.email, loginData.password).subscribe(
                (data) => {
                    console.log(data);

                    this.errorMessage = '';
                    this.localStorageSrv.setToken(data.token);
                    this.route.navigateByUrl('/');
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                    this.isLodaing = false;
                    this.errorMessage = 'Email or Password are wrong';

                    if (error.status !== 400) {
                        this.errorMessage = 'Error on server';
                    }
                }
            );
        }
        console.log(this.loginForm);
    }
    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
