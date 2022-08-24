import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public listComplaints(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    if (queries?.startDate) {
      params = params.append('startDate', queries.startDate.toString());
    }
    if (queries?.endDate) {
      params = params.append('endDate', queries.endDate.toString());
    }
    return this.http.get(`${this.baseUrl}complaints`, {
      params,
      observe: 'response',
    });
  }

  public viewComplaint(id): Observable<any> {
    return this.http.get(`${this.baseUrl}complaints/${id}`, {
      observe: 'response',
    });
  }
  public updateComplaintstatus(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}complaints/${id}/updateStatus`, body, {
      observe: 'response',
    });
  }
  public updateComplaintAction(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}complaints/${id}/updateActionText`, body, {
      observe: 'response',
    });
  }
  public deleteComplaint(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}complaints/${id}`, {
      observe: 'response',
    });
  }
  public getComplaintsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}complaints/count/all`, {
      observe: 'response',
    });
  }


  public createComplaint(body): Observable<any> {
    return this.http.post(`${this.baseUrl}complaints`, body, {
      observe: 'response',
    });
  }


  public updateComplaint(ComplaintId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}complaints/${ComplaintId}`, body, {
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
    return this.http.get(`${this.baseUrl}complaints/questions/unhandled`, {
      params,
      observe: 'response',
    });
  }

}
