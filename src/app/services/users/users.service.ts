import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public listUsers(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    console.log('queries', queries);

    if (queries?.role) {
      params = params.append('role', queries.role.toString());
    }
    return this.http.get(`${this.baseUrl}users`, {
      params,
      observe: 'response',
    });
  }


  public listAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}users`, {
      observe: 'response',
    });
  }
  public viewUser(id): Observable<any> {
    return this.http.get(`${this.baseUrl}users/${id}`, {
      observe: 'response',
    });
  }

  public deleteUser(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}users/${id}`, {
      observe: 'response',
    });
  }


  public createUser(body): Observable<any> {
    const headers = new HttpHeaders();
    if (body.hasOwnProperty('identity_scan')) {
      headers.append('Content-Type', 'multipart/form-data');
      return this.http.post(`${this.baseUrl}users/create`, body, {
        headers: headers,
        observe: 'response',
      });
    }
    return this.http.post(`${this.baseUrl}users/create`, body, {
      observe: 'response',
    });
  }

  public updateUser(userId, body): Observable<any> {
    const headers = new HttpHeaders();
    if (body.hasOwnProperty('identity_scan')) {
      headers.append('Content-Type', 'multipart/form-data');
      return this.http.put(`${this.baseUrl}users/${userId}`, body, {
        headers: headers,
        observe: 'response',
      });
    }
    return this.http.put(`${this.baseUrl}users/${userId}`, body, {
      observe: 'response',
    });
  }
  public searchUser(text): Observable<any> {
    return this.http.get(`${this.baseUrl}users/search/text?term=${text}`, {
      observe: 'response',
    });
  }
}
