import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { User } from 'src/app/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private currentAdminSubject: BehaviorSubject<User>;
    public currentAdmin: Observable<User>;
    apiUrl = environment.apiUrl + "/auth/";
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentAdminSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentAdmin')));
        this.currentAdmin = this.currentAdminSubject.asObservable();

    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public get currentAdminValue(): User {
        return this.currentAdminSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(this.apiUrl + 'login', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    adminLogin(username, password) {
            return this.http.post<any>(this.apiUrl + 'admin/login', { username, password })
                .pipe(map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAdmin', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }));
        }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}