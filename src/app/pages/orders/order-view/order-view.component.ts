import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BundlesService } from '../../../services/bundles/bundles.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {
  updateUserForm: FormGroup;
  updateOrderForm: FormGroup;
  imageValue: File;
  bundlesList: any;
  loading: boolean;
  orderId: any;
  currentOrder: any;
  userId: any;
  previewIt: boolean;
  photoToPreview: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private bundlesService: BundlesService,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrder(this.orderId);
    });
  }
  loadOrder(orderId: any) {
    this.ordersService.viewOrder(orderId).subscribe(
      response => {
        if (response?.body?._id) {
          this.currentOrder = response.body;
        }
      },
    );
  }
  previewPhoto(url) {
    this.previewIt = true;
    this.photoToPreview = url;
  }
}
