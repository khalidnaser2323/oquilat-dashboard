import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ComplaintsService } from '../../../services/complaints/complaints.service';

@Component({
  selector: 'complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.scss'],
})
export class ComplaintsListComponent implements OnInit {
  complaintsList: any;
  selectedAll: any;
  activeComplaint: any;
  inActiveComplaint: any;
  AllComplaintCount: any;
  fileName = 'ExcelSheet.xlsx';
  closeResult: string;
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  images = ['https://st2.depositphotos.com/1092019/7050/i/600/depositphotos_70506257-stock-photo-complaints-concept-with-word-on.jpg'];
  complaintStatusList = [
    { label: 'مستلمة', value: 'received' },
    { label: 'قيد التنفيذ', value: 'handling' },
    { label: 'تم التنفيذ', value: 'resolved' },
  ];
  action: string;
  selectedComplaint: any;
  isInputShown = false;
  spinnerLoading = false;
  @ViewChild('input') input: ElementRef;
  noUsers: boolean;
  subscription: Subscription;
  totalItemsPagination: any = 0;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private complaintsService: ComplaintsService,
  ) { }

  ngOnInit(): void {
    this.listComplaints();
  }

  listComplaints() {
    this.complaintsService.listComplaints(this.page, '', this.itemsPerPage, true).subscribe(
      res => {
        if (res.body.complaints.length) {
          this.totalItems = Number(res.body.length);
          this.totalItemsPagination = Number(res.body.length);
          const subList = res.body.complaints.map((sub) => {
            sub.selected = false;
            return sub;
          });
          this.loadAllComplaints();
          this.complaintsList = subList;
        }
      },
    );
  }


  onChange(status, complaint) {
    const body = {
      text: complaint.text,
      mobile: complaint.mobile,
      agentId: localStorage.getItem('userId'),
      status: [{
        type: [{ text: status }],
      }],
    };

    this.complaintsService.updateComplaintstatus(complaint._id, body).subscribe(
      (data) => {
        this.listComplaints();
        this.toastr.success('تم تعديل حالة الشكوي بنجاح');
      },
      (err) => {
        if (err.error) {
          this.toastr.error('حدث خطأ اثناء تعديل حالة الشكوي', 'حاول مرة اخري');
        }
      },
    );
  }

  loadPage(page: number) {
    this.page = page;
    this.listComplaints();
  }
  open(content, compalint?) {
    if (compalint) {
      this.selectedComplaint = compalint;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  assginCompplaint(compalint) {
    const body = {
      mobile: compalint.mobile,
      agentId: localStorage.getItem('userId'),
    };
    this.complaintsService.updateComplaint(compalint._id, body).subscribe(
      (data) => {
        this.listComplaints();
        this.toastr.success('تم سحب الشكوي بنجاح');
      },
      (err) => { },
    );
  }

  sendAction() {
    if (!this.action) {
      this.toastr.info('يرجي ادخال الحقل');
      return;
    }
    const body = {
      text: this.selectedComplaint.text,
      mobile: this.selectedComplaint.mobile,
      agentId: localStorage.getItem('userId'),
      actionText: [{
        anwser: this.action,
        agentId: localStorage.getItem('userId'),
      }]
    };
    this.complaintsService.updateComplaintAction(this.selectedComplaint._id, body).subscribe(
      (data) => {
        this.listComplaints();
        this.modalService.dismissAll();
        this.toastr.success('تم إضافة ملاحظات الشكوي بنجاح');
      },
      (err) => {
        if (err.error) {
          this.toastr.error('حدث خطأ اثناء  إضافة ملاحظات  الشكوي', 'حاول مرة اخري');
        }
      },
    );
  }

  showInput() {
    this.isInputShown = true;
    this.input.nativeElement.focus();
  }

  hideInput() {
    this.isInputShown = false;
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        tap((text) => {
          const term = this.input.nativeElement.value;
          if (!term) {
            this.spinnerLoading = false;
            this.listComplaints();
            return;
          }
          this.search(term);
        }),
      ).subscribe();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  loadAllComplaints() {
    this.complaintsService.listComplaints(1, '', 1, false).subscribe(
      res => {
        if (res?.body?.length) {
          localStorage.setItem('allOrdersList', JSON.stringify(res.body));
        }
      },
    );
  }
  search(term) {
    const orders = JSON.parse(localStorage.getItem('allOrdersList'));
    if (!orders) {
      this.spinnerLoading = false;
      this.loadAllComplaints();
      return;
    }
    const matches = orders.filter(s => {
      return s && s.mobile && s.mobile.toString().toLowerCase().includes(term)
    },
    );
    this.totalItemsPagination = matches.length;
    if (matches && matches.length) {
      const subList = matches.map((sub) => {
        sub.selected = false;
        return sub;
      });
      this.spinnerLoading = false;
      this.noUsers = false;
      this.complaintsList = subList;
    } else {
      this.noUsers = true;
      this.spinnerLoading = false;
      this.complaintsList = [];
    }
  }
}
