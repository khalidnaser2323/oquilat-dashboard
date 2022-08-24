import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl: string = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }

  public listOrders(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
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
    return this.http.get(`${this.baseUrl}orders`, {
      params,
      observe: 'response',
    });
  }

  public viewOrder(id): Observable<any> {
    return this.http.get(`${this.baseUrl}orders/${id}`, {
      observe: 'response',
    });
  }
  public updateOrderStatus(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}orders/${id}/updateStatus`, body, {
      observe: 'response',
    });
  }
  public deleteOrder(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}orders/${id}`, {
      observe: 'response',
    });
  }
  public getOrdersCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}orders/count/all`, {
      observe: 'response',
    });
  }


  public createOrder(body): Observable<any> {
    return this.http.post(`${this.baseUrl}orders`, body, {
      observe: 'response',
    });
  }


  public updateOrder(orderId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}orders/${orderId}`, body, {
      observe: 'response',
    });
  }
  public searchOrders(text): Observable<any> {
    return this.http.get(`${this.baseUrl}orders/search/text?term=${text}`, {
      observe: 'response',
    });
  }
}
