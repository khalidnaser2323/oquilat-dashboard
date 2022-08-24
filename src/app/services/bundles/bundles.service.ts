import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BundlesService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public listBundles(page = 1, $name = '', limit = 20, pagination = true): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    return this.http.get(`${this.baseUrl}bundles`, {
      params,
      observe: 'response',
    });
  }

  public viewBundle(id): Observable<any> {
    return this.http.get(`${this.baseUrl}bundles/${id}`, {
      observe: 'response',
    });
  }

  public deleteBundle(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}bundles/${id}`, {
      observe: 'response',
    });
  }

  public createBundle(body): Observable<any> {
    return this.http.post(`${this.baseUrl}bundles`, body, {
      observe: 'response',
    });
  }

  public updateBundle(bundleId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}bundles/${bundleId}`, body, {
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

}
