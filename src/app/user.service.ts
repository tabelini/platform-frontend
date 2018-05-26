import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User, AuthenticationStatus, LoginResponse} from 'platform-domain';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa(username + ':' + password));
    this.user$.next(new User(null, null, username, username, null, [],
      AuthenticationStatus.LOGGING));
    this.httpClient.get<LoginResponse>('/api/auth/v1/token', {headers: headers})
      .subscribe(res => {
        const token = res.token;
        const user = res.user;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        console.log(`User ${username} logged with token:${token}`);
        console.log(`User data: ${JSON.stringify(user)}`);
        user.authenticationStatus = AuthenticationStatus.LOGGED;
        this.user$.next(user);
      }, error => {
        console.log(`Error: ${JSON.stringify(error.error)}`);
        if (error && error.error && error.error.statusCode === 403) {
          this.user$.next(new User(null, null, username, username, null, [], AuthenticationStatus.WRONG_PASSWORD));
        } else {
          this.user$.next(new User(null, null, username, username, null, [], AuthenticationStatus.UNKNOWN_ERROR));
        }
      });
  }
}
