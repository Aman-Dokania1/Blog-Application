import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from '../modals/login-form';
import { UserDetails, UserResponse } from '../modals/user-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:8080/api';

  login(values: LoginForm): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}/auth/login`, {
      userNameOrEmail: values.username,
      password: values.password,
    });
  }

  // signup(values: any): Observable<any> {
  //   return this.http.post(
  //     `${this.url}/signup`,
  //     {
  //       name: values.name,
  //       userName: values.userName,
  //       email: values.email,
  //       password: values.password,
  //     },
  //     {
  //       responseType: 'text',
  //     }
  //   );
  // }

  signupV2(value: any, file: File): Observable<any> {
    let signupData = {
      name: value.name,
      userName: value.userName,
      email: value.email,
      password: value.password,
    };

    let formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(signupData));
    console.log(file);
    console.log(JSON.stringify(signupData));
    return this.http.post(`${this.url}/auth/v2/signup`, formData, {
      responseType: 'text',
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token == undefined || token == null || token === '') {
      localStorage.clear();
      return false;
    } else return true;
  }

  userDetails(): Observable<any> {
    return this.http.get<UserDetails>(`${this.url}/userDetails`);
  }

  changePassword(value: any): Observable<any> {
    return this.http.post(`${this.url}/changePassword`, value, {
      responseType: 'text',
    });
  }
}
