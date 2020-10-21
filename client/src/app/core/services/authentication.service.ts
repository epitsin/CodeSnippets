import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const payload = JSON.parse(localStorage.getItem('currentUser')) as IJwtPayload;
    this.handleJwtPayload(payload);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.http.post<IJwtPayload>(`http://localhost:8626/api/users/register`, user)
      .pipe(map(payload => {
        localStorage.setItem('currentUser', JSON.stringify(payload));
        this.handleJwtPayload(payload);

        return payload;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<IJwtPayload>(`http://localhost:8626/api/users/login`, { email, password })
      .pipe(map(payload => {
        localStorage.setItem('currentUser', JSON.stringify(payload));
        this.handleJwtPayload(payload);

        return payload;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private handleJwtPayload(payload: IJwtPayload) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    const tokenInfo = this.decodeJwtPayload(payload.token);
    const user: User = {
      id: tokenInfo.id,
      email: tokenInfo.email,
      firstName: tokenInfo.firstName,
      lastName: tokenInfo.lastName
    }

    if (this.currentUserSubject) {
      this.currentUserSubject.next(user)
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(user);
    }
  }

  private decodeJwtPayload(token: string) {
    try {
      return jwt_decode(token);
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }
}

interface IJwtPayload {
  token: string;
  expiresIn: string;
}
