
import { tap, filter, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../model/user";
import * as auth0 from 'auth0-js';
import { Router } from "@angular/router";
import * as moment from 'moment';

enum LocalStorageName {
  ExpiresAt = "expires_at",
  Id_token = "id_token",

}

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

const AUTH_CONFIG = {
  clientID: 'Jr4l5ZoCip5RmbJTqQv9EKesMyPpPwdl',
  domain: "dev-t8irge8s.eu.auth0.com"
};


@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: 'https://localhost:4200/lessons',
    scope: 'openid email'
  });

  private subject = new BehaviorSubject<User>(undefined);
  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!undefined));

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.userInfo();
    }
  }

  login() {
    this.auth0.authorize({ initialScreen: 'login' });
  }

  signUp() {
    this.auth0.authorize({ initialScreen: 'signUp' });
  }

  retrieveAuthInfoFromUrl() {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        console.log("Could not parse the hash", err);
        return;
      } else if (authResult && authResult.idToken) {

        window.location.hash = '';

        console.log("Authentication successful, authResult: ", authResult);

        this.setSession(authResult);

        this.userInfo();
      }

    });


  }

  userInfo() {
    this.http.put<User>('/api/userinfo', null)
      .pipe(
        shareReplay(),
        tap(user => this.subject.next(user))
      )
      .subscribe();
  }

  logout() {
    localStorage.removeItem(LocalStorageName.Id_token);
    localStorage.removeItem(LocalStorageName.ExpiresAt);
    this.router.navigate(['/lessons']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem(LocalStorageName.ExpiresAt);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem(LocalStorageName.Id_token, authResult.idToken);
    localStorage.setItem(LocalStorageName.ExpiresAt, JSON.stringify(expiresAt.valueOf()));
  }

}







