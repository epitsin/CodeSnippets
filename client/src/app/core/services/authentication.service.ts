import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private apiUrl = environment.baseUrl;

  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const payload = JSON.parse(localStorage.getItem('currentUser')) as IJwtPayload;
    this.handleJwtPayload(payload);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public register(user: User) {
    return this.http.post<IJwtPayload>(`${this.apiUrl}/auth/register`, user)
      .pipe(map((payload) => {
        localStorage.setItem('currentUser', JSON.stringify(payload));
        this.handleJwtPayload(payload);

        return payload;
      }));
  }

  public login(email: string, password: string) {
    return this.http.post<IJwtPayload>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(map((payload) => {
        localStorage.setItem('currentUser', JSON.stringify(payload));
        this.handleJwtPayload(payload);

        return payload;
      }));
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.handleJwtPayload(null);
  }

  private handleJwtPayload(payload: IJwtPayload) {
    let user: User = null;

    if (payload && payload.token) {
      /**
       * store user details and jwt token in local storage
       * to keep user logged in between page refreshes
       */
      const tokenInfo = this.decodeJwtPayload(payload.token);
      user = {
        _id: tokenInfo._id,
        email: tokenInfo.email,
        firstName: tokenInfo.firstName,
        lastName: tokenInfo.lastName,
        roles: tokenInfo.roles,
        token: payload.token,
      };
    }

    if (this.currentUserSubject) {
      this.currentUserSubject.next(user);
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(user);
    }
  }

  private decodeJwtPayload(token: string) {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

interface IJwtPayload {
  token: string;
  expiresIn: string;
}
