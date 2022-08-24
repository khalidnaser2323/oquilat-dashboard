import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'orders-print',
  templateUrl: './orders-print.component.html',
  styleUrls: ['./orders-print.component.scss'],
})
export class OrdersPrintComponent implements OnInit {
  subscriptions: any;
  selectedAll: any;
  activeOrders: any;
  inActiveOrders: any;
  AllOrdersCount: any;
  fileName = 'ExcelSheet.xlsx';
  closeResult: string;
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  agentRole: any;
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: NgbModal,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.listOrders();
    this.getOrderCount();
    this.agentRole = this.authService.getUserRole();
  }
  getOrderCount() {
    this.ordersService.getOrdersCount().subscribe(res => {
      if (res.body) {
        this.activeOrders = res.body.activeCount;
        this.inActiveOrders = res.body.inactiveCount;
        this.AllOrdersCount = res.body.activeCount + res.body.inactiveCount;
      }
    });
  }
  listOrders() {
    this.ordersService.listOrders(this.page, '', 100, false).subscribe(
      res => {
        if (res.body.length) {
          this.totalItems = Number(res.body.length);
          const subList = res.body.map((sub) => {
            sub.selected = false;
            return sub;
          });
          this.subscriptions = subList;
        }
      },
    );
  }

}
