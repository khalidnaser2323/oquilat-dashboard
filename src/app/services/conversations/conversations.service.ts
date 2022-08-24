import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  checkIsInChatComponent = new BehaviorSubject<Boolean>(false);
  private baseUrl: string = environment.base_url;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }

  public listConversations(page = 1, $name = '', limit = 20, pagination = true, queries?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('name', $name.toString());
    params = params.append('pagination', pagination.toString());
    return this.http.get(`${this.baseUrl}users/conversations/list`, {
      params,
      observe: 'response',
    });
  }

  public viewConversations(userId): Observable<any> {
    return this.http.get(`${this.baseUrl}users/${userId}/conversation`, {
      observe: 'response',
    });
  }

  public sendNewMessage(userId, body): Observable<any> {
    return this.http.post(`${this.baseUrl}users/${userId}/sendWhatsAppMessage`, body, {
      observe: 'response',
    });
  }
  public changeChatStatus(userId, body): Observable<any> {
    return this.http.put(`${this.baseUrl}users/${userId}/updateChatStatus`, body, {
      observe: 'response',
    });
  }
  public getChatStatus(mobile): Observable<any> {
    return this.http.get(`${this.baseUrl}users/chatStatus/${mobile}`, {
      observe: 'response',
    });
  }
  playSound() {
    const audio = new Audio();
    audio.src = '../../../assets/sound/bell.mp3';
    audio.load();
    audio.play();
  }

  showToast(message) {
    this.checkIsInChatComponent.subscribe(state => {
      if (state) {
        this.toastr.success(message);
        return;
      }
    });
  }

}
