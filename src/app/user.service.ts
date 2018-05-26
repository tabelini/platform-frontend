import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa(username + ':' + password));
    this.httpClient.get<LoginResponse>('/api/auth/v1/token', {headers: headers})
      .map(res => res.token)
      .subscribe(token => console.log(`Token: ${token}`));
  }
}


export interface LoginResponse {
  token: string;
}
