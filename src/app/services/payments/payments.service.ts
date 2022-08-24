import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public lisPayments(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
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
    return this.http.get(`${this.baseUrl}payments`, {
      params,
      observe: 'response',
    });
  }

  public viewpayment(id): Observable<any> {
    return this.http.get(`${this.baseUrl}payments/${id}`, {
      observe: 'response',
    });
  }
  public updatepaymentStatus(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}payments/${id}/updateStatus`, body, {
      observe: 'response',
    });
  }
  public deletepayment(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}payments/${id}`, {
      observe: 'response',
    });
  }
  public gePaymentsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}payments/count/all`, {
      observe: 'response',
    });
  }


  public createpayment(body): Observable<any> {
    return this.http.post(`${this.baseUrl}payments`, body, {
      observe: 'response',
    });
  }


  public updateOrder(orderId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}payments/${orderId}`, body, {
      observe: 'response',
    });
  }

}
