import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    userLogged = new BehaviorSubject<Boolean>(this.user_logged());

    constructor(private http: HttpClient) {}

    sign_up(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/sign_up`, { username, password })
            .pipe(map(user => {
                return user;
            }));
    }

    sign_in(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/sign_in`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    user_logged() {
        return localStorage.getItem('currentUser') ? true : false;
    }
}