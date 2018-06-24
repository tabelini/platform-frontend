import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User, AuthenticationStatus, LoginResponse} from 'platform-domain';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  static readonly USERNAME_KEY = 'username';
  static readonly TOKEN_KEY = 'token';

  user$ = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa(username + ':' + password));
    this.user$.next(new User(null, null, username, username, null, [],
      AuthenticationStatus.LOGGING));
    this.httpClient.get<LoginResponse>('/api/auth/v1/token', {headers: headers})
      .subscribe(res => {
        const token = res.token;
        const user = User.fromJson(res.user);
        localStorage.setItem(UserService.TOKEN_KEY, token);
        localStorage.setItem(UserService.USERNAME_KEY, username);
        console.log(`User ${username} logged with token:${token}`);
        console.log(`User data: ${JSON.stringify(user)}`);
        user.authenticationStatus = AuthenticationStatus.LOGGED;
        this.user$.next(user);
      }, error => {
        console.log(`Error: ${JSON.stringify(error.error)}`);
        if (error && error.error && error.error.statusCode === 403) {
          this.user$.next(new User(null, null, username, username, null, [],
            AuthenticationStatus.WRONG_PASSWORD));
        } else {
          this.user$.next(new User(null, null, username, username, null, [],
            AuthenticationStatus.UNKNOWN_ERROR));
        }
      });
  }

  tryLoginByToken(): Promise<User> {
    const token = localStorage.getItem(UserService.TOKEN_KEY);
    const username = localStorage.getItem(UserService.USERNAME_KEY);
    return new Promise<User>((resolve, reject) => {
      if (!token || !username) {
        reject('LOGIN_NOT_FOUND');
      } else {
        const headers = new HttpHeaders().append('x-token', token);
        this.user$.next(new User(null, null, username, username, null, [],
          AuthenticationStatus.LOGGING));
        this.httpClient.get<User>('/api/auth/v1/current_user', {headers: headers})
          .map(res => User.fromJson(res))
          .subscribe(user => {
            console.log(`User ${username} automatically logged with token:${token}`);
            console.log(`User data: ${JSON.stringify(user)}`);
            user.authenticationStatus = AuthenticationStatus.LOGGED;
            this.user$.next(user);
            resolve(user);
          }, error => {
            const errorUser = new User(null, null, username, username, null, [],
              AuthenticationStatus.UNKNOWN_ERROR);
            this.user$.next(errorUser);
            reject(error);
          });
      }
    });
  }

  logout() {
    const currentUser = this.user$.getValue();
    currentUser.authenticationStatus = AuthenticationStatus.LOGGED_OUT;
    localStorage.removeItem(UserService.TOKEN_KEY);
    localStorage.removeItem(UserService.USERNAME_KEY);
    this.user$.next(currentUser);
    this.router.navigateByUrl('/pages/auth/login-2');
  }
}
