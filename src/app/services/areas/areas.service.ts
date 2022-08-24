import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public listAreas(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    if (queries?.role) {
      params = params.append('role', queries.role.toString());
    }
    return this.http.get(`${this.baseUrl}polygons`, {
      params,
      observe: 'response',
    });
  }


  public deleteArea(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}polygons/${id}`, {
      observe: 'response',
    });
  }


  public createArea(body): Observable<any> {
    return this.http.post(`${this.baseUrl}polygons`, body, {
      observe: 'response',
    });
  }

  public updateArea(areaId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}polygons/${areaId}`, body, {
      observe: 'response',
    });
  }

}
