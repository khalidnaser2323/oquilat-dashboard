import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ConversationsService } from 'app/services/conversations/conversations.service';
import { WebSocketService } from 'app/services/conversations/web-socket.service';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs/internal/Subject';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'conversations-view',
  templateUrl: './conversations-view.component.html',
  styleUrls: ['./conversations-view.component.scss'],
})
export class ConversationsViewComponent implements OnInit, OnDestroy {
  userId: any;
  conversations: any = [];
  user: any;
  unsubscribeSignal: Subject<void> = new Subject();
  @ViewChildren('box') myScrollContainer: QueryList<any>;
  @ViewChild('box', { static: false }) content: ElementRef;
  conversionId: any;
  messageText: any;
  mobile: any;
  chat_status: string;
  constructor(
    private router: Router,
    private socket: Socket,
    private location: Location,
    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute,
    private webSocketService: WebSocketService,
    private conversationsService: ConversationsService,
  ) {
    router.events.pipe(
      takeUntil(this.unsubscribeSignal.asObservable()),
    ).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.conversationsService.checkIsInChatComponent.next(false);
      }
    });
  }
  back() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.webSocketService.unsubscribeFromRoom(this.userId);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadConversation(this.userId);
    });
  }
  getChatStatus(mobile) {
    this.conversationsService.getChatStatus(mobile).subscribe(response => {
      if (response?.body?._id) {
        this.chat_status = response.body.chat_status || 'bot'
      }
    });
  }

  scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
  loadConversation(userId: any) {
    this.activateRoute.paramMap
      .pipe(
        tap((params) => this.conversionId = params['params']['id']),
        takeUntil(this.unsubscribeSignal.asObservable()),
        switchMap((params) => {
          this.webSocketService.subscribeToRoom(this.userId);
          return this.conversationsService.viewConversations(params['params']['id']);
        }),
      )
      .subscribe(data => {
        this.conversations = data.body.conversations;
        this.mobile = data.body.mobile;
        this.getChatStatus(this.mobile);
        this.conversations = this.conversations.reverse();
      }, () => {
      });
    this.socket.on('data', (data) => {
      const newMessage = JSON.parse(data);
      newMessage[0].isToday = true;
      this.conversations.push(newMessage[0]);
      this.conversationsService.playSound();
      this.scrollToBottom();
    });
    this.conversationsService.viewConversations(userId).subscribe(
      response => {
        if (response?.body?._id) {
          this.user = response.body;
          this.conversations = response.body.conversations;
          if (this.conversations.length) {
            this.conversations.map(c => {
              // Create date from input value
              const inputDate = new Date(c.created_at);
              // Get today's date
              const todaysDate = new Date();
              // call setHours to take the time out of the comparison
              if (inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
                // Date equals today's date
                c.isToday = true;
              } else {
                c.isToday = false;
              }
            });
          }
          this.conversations.reverse();

        }
      },
    );
  }

  sendNewMessageWhenClickEnter(event) {
    if (event.key === 'Enter' && event.keyCode === 13) {
      if (event.target.value.length < 1) {
        return;
      }
      const body = {
        'to': this.mobile,
        'body': this.messageText,
      };
      this.conversationsService.sendNewMessage(this.conversionId, body).pipe(
        takeUntil(this.unsubscribeSignal.asObservable()),
        finalize(() => this.conversationsService.playSound()),
      ).subscribe(data => {
        // data.body.conversations[0].isToday = true;
        // this.conversations.push(data.body.conversations[0]);
        this.messageText = '';
      });
    }
  }

  sendNewMessage() {
    const body = {
      'to': this.mobile,
      'body': this.messageText,
    };
    this.conversationsService.sendNewMessage(this.conversionId, body).subscribe(data => {
      // data.body.conversations[0].isToday = true;
      // this.conversations.push(data.body.conversations[0]);
      this.messageText = '';
    });
  }

  changeStatus(status) {
    const body = {
      'chat_status': status,
    };
    this.conversationsService.changeChatStatus(this.userId, body).pipe(
      finalize(() => this.conversationsService.playSound()),
      takeUntil(this.unsubscribeSignal.asObservable()),
    ).subscribe(data => {
      this.chat_status = data.body.chat_status;
    });
  }
}
