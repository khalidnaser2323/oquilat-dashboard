import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FaqService } from '../../../services/faq/faq.service';

@Component({
  selector: 'faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit {
  faqsList: any;
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  totalItemsPagination: any = 0;

  constructor(
    private toastr: ToastrService,
    private faqService: FaqService,
  ) { }

  ngOnInit(): void {
    this.listFaqs();
  }
  listFaqs() {
    this.faqService.listfaq(this.page, '', this.itemsPerPage, true).subscribe(
      res => {
        if (res.body.faqs.length) {
          this.totalItems = Number(res.body.length);
          this.totalItemsPagination = Number(res.body.length);
          this.faqsList = res.body.faqs;
        }
      },
    );
  }
  loadPage(page: number) {
    this.page = page;
    this.listFaqs();
  }
  deleteFaq(id) {
    this.faqService.deleteFaq(id).subscribe(
      response => {
        if (response.body) {
          this.listFaqs();
          this.toastr.success('تم حذف السؤال بنجاح');
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      },
    );
  }
}
