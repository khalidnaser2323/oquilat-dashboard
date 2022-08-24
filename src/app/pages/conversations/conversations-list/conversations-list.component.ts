import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConversationsService } from '../../../services/conversations/conversations.service';

@Component({
  selector: 'conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss'],
})
export class ConversationsListComponent implements OnInit {
  conversationsList: any;
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  totalItemsPagination: any = 0;

  constructor(
    private toastr: ToastrService,
    private conversationsService: ConversationsService,
  ) { }

  ngOnInit(): void {
    this.listConversations();
  }
  listConversations() {
    this.conversationsService.listConversations(this.page, '', this.itemsPerPage, true).subscribe(
      res => {
        if (res.body.users.length) {
          this.totalItems = Number(res.body.length);
          this.totalItemsPagination = Number(res.body.length);
          this.conversationsList = res.body.users;
        }
      },
    );
  }
  loadPage(page: number) {
    this.page = page;
    this.listConversations();
  }
}
