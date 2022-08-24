import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { OrdersService } from '../../../services/orders/orders.service';
import { PaymentsService } from '../../../services/payments/payments.service';
import { UsersService } from '../../../services/users/users.service';
@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @ViewChild('createPayemntModal') createPayemntModal: any;

  subscriptions: any;
  selectedAll: any;
  activeOrders: any;
  inActiveOrders: any;
  AllOrdersCount: any;
  fileName = 'ExcelSheet.xlsx';
  closeResult: string;
  itemsPerPage: number = 20;
  totalItems: any = 0;
  totalItemsPagination: any = 0;
  page: any = 1;
  previousPage: any;
  isInputShown = false;

  paymentStatusList = [
    { value: 'notdetermined', label: 'لم يتم التحديد' },
    { value: 'paid', label: 'تم الدفع' },
    { value: 'unpaid', label: 'لم يتم الدفع' },
    { value: 'forgiven', label: 'معفي' },
  ];
  usersList: any[];
  agentRole: any;
  spinnerLoading = false;
  @ViewChild('input') input: ElementRef;
  noUsers: boolean;
  subscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ordersService: OrdersService,
    private translate: TranslateService,
    private authService: AuthService,
    private usersService: UsersService,
    private paymentsService: PaymentsService,
  ) {
    translate.use('ar');
  }

  ngOnInit(): void {
    this.listOrders();
    this.loadUsers();
    this.agentRole = this.authService.getUserRole();
  }
  loadUsers(queries?) {
    this.usersList = [];
    this.usersService.listUsers(this.page, '', this.itemsPerPage, true, queries).subscribe(
      res => {
        if (res.body.users.length) {
          this.usersList = res.body.users;
        }
      },
    );
  }


  listOrders() {
    this.ordersService.listOrders(this.page, '', this.itemsPerPage, true).subscribe(
      res => {
        if (res.body.subscriptions.length) {
          this.totalItems = Number(res.body.length);
          this.totalItemsPagination = Number(res.body.length);
          this.loadAllSubscriptions();
          const subList = res.body.subscriptions.map((sub) => {
            if (sub.payment) {
              sub.payment.days = this.calculateDiff(sub.payment.payment_status[0].created_at);
            }
            sub.selected = false;
            return sub;
          });
          this.subscriptions = subList;
        }
      },
    );
  }
  loadAllSubscriptions() {
    this.ordersService.listOrders(1, '', 1, false).subscribe(
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
      this.loadAllSubscriptions();
      return;
    }
    const matches = orders.filter(s => {
      return s && s.mobile && s.mobile.toString().toLowerCase().includes(term) ||
        s && s.name && s.name.toString().toLowerCase().includes(term) ||
        s && s.user && s.user.name && s.user.name.toString().toLowerCase().includes(term) ||
        s && s.user && s.user.email && s.user.email.toString().toLowerCase().includes(term) ||
        s && s.user && s.user.mobile && s.user.mobile.toString().toLowerCase().includes(term) ||
        s && s.bundle && s.bundle.name && s.bundle.name.toString().toLowerCase().includes(term);
    },
    );
    this.totalItemsPagination = matches.length;
    if (matches && matches.length) {
      const subList = matches.map((sub) => {
        if (sub.payment) {
          sub.payment.days = this.calculateDiff(sub?.payment?.payment_status[0]?.created_at);
        }
        sub.selected = false;
        return sub;
      });
      this.spinnerLoading = false;
      this.noUsers = false;
      this.subscriptions = subList;
    } else {
      this.noUsers = true;
      this.spinnerLoading = false;
      this.subscriptions = [];
    }
  }
  calculateDiff(dateSent) {
    const currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor(
      (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
  onChangePage(event) {
    this.ordersService.listOrders(event.pageIndex + 1, '', 20, true).subscribe((res) => {
      if (res.body.subscriptions.length) {
        this.totalItems = Number(res.body.length);
        const subList = res.body.subscriptions.map((sub) => {
          sub.selected = false;
          return sub;
        });
        this.subscriptions = subList;
      }
    });
  }
  selectAll() {

    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.subscriptions.every(function (item: any) {
      return item.selected === true;
    });
  }

  exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  open(content) {
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
  deleteSubscriptions() {
    this.subscriptions.forEach((sub, i) => {
      if (sub.selected) {
        this.ordersService.deleteOrder(sub._id).subscribe(
          response => {
            if (response.body) {
              if ((this.subscriptions.length - 1) === i) {
                this.listOrders();
                this.toastr.success('تم حذف المحدد بنجاح');
              }
            }
          }, err => {
            this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
          },
        );
      }
    });
    this.modalService.dismissAll();
  }
  deleteOneSub(id) {
    this.ordersService.deleteOrder(id).subscribe(
      response => {
        if (response.body) {
          this.listOrders();
          this.toastr.success('تم حذف المحدد بنجاح');
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      },
    );
  }
  toggleActivate(subscription) {
    const body = {
      isActive: !subscription.isActive,
      agentId: localStorage.getItem('userId'),

    };
    this.ordersService.updateOrderStatus(subscription._id, body).subscribe(
      response => {
        if (response.body) {
          if (subscription.isActive) {
            this.toastr.success('تم تعطيل الطلب بنجاح');
          } else {
            this.toastr.success('تم تفعيل الطلب بنجاح');
          }
          this.listOrders();
        } else {
          this.toastr.warning('حدث خطأ ما ... حاول مرة اخري');
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      },
    );
  }

  loadPage(page: number) {
    this.page = page;
    this.listOrders();
  }

  onPaymentStatusChange(status, order) {
    const paymentId = order?.payment?._id;

    if (paymentId) {
      const payment = order.payment;
      const body = {
        invoice_price: payment.invoice_price,
        payment_status: [{
          type: [{ text: status }],
        }],
        agentId: localStorage.getItem('userId'),
      };
      // update payment
      this.paymentsService.updatepaymentStatus(paymentId, body).subscribe(
        (data) => {
          this.listOrders();
          this.toastr.success('تم تعديل حالة الدفع بنجاح');
        },
        (err) => {
          if (err.error) {
            this.toastr.error('حدث خطأ اثناء تعديل حالة الدفع', 'حاول مرة اخري');
          }
        },
      );
    } else {
      // create new payment
      // document.getElementById('openModalButton').click();
    }

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
            this.listOrders();
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


}
