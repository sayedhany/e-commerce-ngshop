import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = environment.apiUrl + 'users';

    constructor(
        private http: HttpClient,
        private router: Router,
        private localStorageSrv: LocalStorageService
    ) {}
    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/login`, {
            email,
            password
        });
    }
    logout() {
        this.localStorageSrv.removeToken();
        this.router.navigate(['/login']);
    }
}
