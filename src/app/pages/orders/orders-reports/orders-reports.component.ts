import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../services/orders/orders.service';
import { PaymentsService } from '../../../services/payments/payments.service';

@Component({
  selector: 'orders-reports',
  templateUrl: './orders-reports.component.html',
  styleUrls: ['./orders-reports.component.scss'],
})
export class OrdersReportsComponent implements OnInit {
  from: any;
  to: any;
  type: any;
  loading: boolean;
  totalItems: number;
  subscriptions: any;
  paymentsList: any;
  paidInvoies = [];
  unPaidInvoies = [];
  forgivenInvoies = [];
  totoalPriceForPaidInvoices: number = 0;
  totoalPriceForUnPaidInvoices: number = 0;
  totoalPriceForForgivenInvoices: number = 0;
  agentRole: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private ordersService: OrdersService,
    private paymentsService: PaymentsService,
  ) { }

  ngOnInit(): void {
    this.agentRole = this.authService.getUserRole();
  }

  loadReport() {
    if (!this.from || !this.to) {
      this.toastr.info('يرجي اختيار التاريخ من و الي');
      return;
    }
    if (!this.type) {
      this.toastr.info('يرجي اختيار نوع التقرير');
      return;
    }
    const queries = {
      startDate: this.from,
      endDate: this.to,
    };
    if (this.type === 'orders') {
      this.loadOrders(queries);
    }
    if (this.type === 'payments') {
      this.loadPayments(queries);
    }
  }

  loadOrders(queries: { startDate: any; endDate: any; }) {
    this.loading = true;
    this.ordersService.listOrders(1, '', 100, false, queries).subscribe(
      res => {
        this.loading = false;
        if (res?.body?.length) {
          this.totalItems = Number(res.body.length);
          const subList = res.body.map((sub) => {
            sub.selected = false;
            return sub;
          });
          this.subscriptions = subList;
        } else {
          this.totalItems = 0;
          this.subscriptions = [];
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
        this.loading = false;
      },
    );
  }

  loadPayments(queries: { startDate: any; endDate: any; }) {
    this.loading = true;
    this.paymentsService.lisPayments(1, '', 100, false, queries).subscribe(
      res => {
        this.loading = false;
        if (res?.body?.length) {
          this.totalItems = Number(res.body.length);
          this.paymentsList = res.body;
          this.paidInvoies = this.paymentsList.filter(patment => patment?.payment_status?.length && patment.payment_status[0].text === 'paid');
          this.unPaidInvoies = this.paymentsList.filter(patment => patment?.payment_status?.length && patment.payment_status[0].text === 'unpaid');
          this.forgivenInvoies = this.paymentsList.filter(patment => patment?.payment_status?.length && patment.payment_status[0].text === 'forgiven');

          if (this.paidInvoies && this.paidInvoies.length) {
            let sum = 0;
            this.paidInvoies.forEach((payment, index, arry) => {
              if (payment.invoice_price && typeof payment.invoice_price === 'number')
                sum += payment.invoice_price;
            });
            this.totoalPriceForPaidInvoices = sum;
          }
          if (this.unPaidInvoies && this.unPaidInvoies.length) {
            let sum = 0;
            this.unPaidInvoies.forEach((payment, index, arry) => {
              if (payment.invoice_price && typeof payment.invoice_price === 'number')
                sum += payment.invoice_price;
            });
            this.totoalPriceForUnPaidInvoices = sum;
          }

          if (this.forgivenInvoies && this.forgivenInvoies.length) {
            let sum = 0;
            this.forgivenInvoies.forEach((payment, index, arry) => {
              if (payment.invoice_price && typeof payment.invoice_price === 'number')
                sum += payment.invoice_price;
            });
            this.totoalPriceForForgivenInvoices = sum;
          }


        } else {
          this.totalItems = 0;
          this.paymentsList = [];
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
        this.loading = false;
      },
    );
  }

}
