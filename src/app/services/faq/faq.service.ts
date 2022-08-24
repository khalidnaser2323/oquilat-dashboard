import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public listfaq(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    return this.http.get(`${this.baseUrl}faq`, {
      params,
      observe: 'response',
    });
  }

  public viewFaq(id): Observable<any> {
    return this.http.get(`${this.baseUrl}faq/${id}`, {
      observe: 'response',
    });
  }


  public deleteFaq(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}faq/${id}`, {
      observe: 'response',
    });
  }



  public createFaq(body): Observable<any> {
    return this.http.post(`${this.baseUrl}faq`, body, {
      observe: 'response',
    });
  }


  public updateFaq(FaqId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}faq/${FaqId}`, body, {
      observe: 'response',
    });
  }


  public listQuestions(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    if (queries?.questionFor) {
      params = params.append('questionFor', queries.questionFor.toString());
    }
    return this.http.get(`${this.baseUrl}faq/questions/unhandled`, {
      params,
      observe: 'response',
    });
  }

}
