import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.base_url;
  private token: string;
  public tokenSubjectSource = new BehaviorSubject<string>('');
  public tokenSubjectData = this.tokenSubjectSource.asObservable();
  public isLogoutSubject = new BehaviorSubject<boolean>(false);
  public isLogoutState = this.isLogoutSubject.asObservable();

  public isUserOperationSource = new BehaviorSubject<boolean>(false);
  public isUserOperationState = this.isUserOperationSource.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public loadUser(userId): Observable<any> {
    return this.http.get(`${this.baseUrl}users/${userId}`, {
      observe: 'response',
    });
  }

  public saveToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.tokenSubjectSource.next(token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }

  public getUserIdWhenLoginIn(): string {
    return localStorage.getItem('userId');
  }

  public getUserPhoneNumber(): string {
    return localStorage.getItem('userPhoneNumber');
  }

  public saveUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  public saveUserPhoneNumber(phoneNumber) {
    localStorage.setItem('userPhoneNumber', phoneNumber);
  }

  public saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  public getUserRole() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData['roles'][0];
  }


  public logOut() {
    localStorage.removeItem('mobile_token');
    localStorage.removeItem('userPhoneNumber');
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  public login($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, $userCredentials, {
      observe: 'response',
    });
  }

  public varifyCode($code): Observable<any> {
    return this.http.post(`${this.baseUrl}verify`, $code, {
      observe: 'response',
    });
  }

  isLoggedIn() {
    return true;
  }

  // public requestResetCode($email): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/email`, $email, {
  //     observe: "response",
  //   });
  // }

  // public checkResetCode($code): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/code`, $code, {
  //     observe: "response"
  //   });
  // }

  // public resetPassword($newPassword): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/reset`, $newPassword, {
  //     observe: "response"
  //   });
  // }
}
