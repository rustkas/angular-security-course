import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';

export const ANONYMOUS_USER: User = {
  id:undefined,
  email:''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$.map(user => <boolean> (user.id !== undefined));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn );

  constructor(private http: HttpClient) { }

  signUp(email:string, password:string){
    return this.http.post<User>('/api/signup',{email,password})
      .shareReplay()
      .do(user => this.subject.next(user));
  }
}
