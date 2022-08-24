import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BundlesService } from '../../../services/bundles/bundles.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss'],
})
export class OrderUpdateComponent implements OnInit {
  updateUserForm: FormGroup;
  updateOrderForm: FormGroup;
  imageValue: File;
  bundlesList: any;
  loading: boolean;
  orderId: any;
  currentOrder: any;
  userId: any;
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
    this.listBundles();
    this.buildupdateUserForm();
    this.buildupdateOrderForm();
  }
  loadOrder(orderId: any) {
    this.ordersService.viewOrder(orderId).subscribe(
      response => {
        if (response?.body?._id) {
          this.currentOrder = response.body;
          this.userId = response.body.user._id;
          this.buildupdateUserForm(this.currentOrder.user);
          this.buildupdateOrderForm(this.currentOrder);
        }
      },
    );
  }
  listBundles() {
    this.bundlesService.listBundles().subscribe(
      response => {
        if (response?.body?.bundles?.length) {
          this.bundlesList = response.body.bundles.map(bundle => {
            return {
              _id: bundle._id,
              label: `${bundle.name} - Mbps ${bundle.speed} - ${bundle.price} SAR`,
            };
          });
        }
      },
    );
  }

  buildupdateUserForm(user?) {
    const fixedUser = Object.assign({
      identification_number: '',
      name: '',
      mobile: '',
      type: '',
      email: '',
      region: '',
      address: '',
      identity_scan: '',
      notes: '',
    }, user);

    if (fixedUser.mobile.startsWith('+966')) {
      let newNumber = fixedUser.mobile;
      newNumber = newNumber.replace('+966', '');
      fixedUser.mobile = newNumber;
    }
    if (fixedUser.mobile.startsWith('966')) {
      let newNumber = fixedUser.mobile;
      newNumber = newNumber.replace('966', '');
      fixedUser.mobile = newNumber;
    }

    this.updateUserForm = this.fb.group({
      identification_number: [fixedUser.identification_number, Validators.required],
      name: [fixedUser.name, Validators.required],
      mobile: [fixedUser.mobile, Validators.required],
      type: ['customer'],
      email: [fixedUser.email],
      region: [fixedUser.region, Validators.required],
      address: [fixedUser.address, Validators.required],
      identity_scan: [fixedUser.identity_scan],
      notes: [fixedUser.notes],
    });
  }

  buildupdateOrderForm(order?) {
    const fixedOrder = Object.assign({
      type: '',
      userType: '',
      bundle: '',
      secondary_ip: '',
      primary_ip: '',
    }, order);
    this.updateOrderForm = this.fb.group({
      type: [fixedOrder.type, Validators.required],
      userType: [fixedOrder.userType, Validators.required],
      bundle: [fixedOrder.bundle?._id, Validators.required],
      secondary_ip: [fixedOrder.secondary_ip],
      primary_ip: [fixedOrder.primary_ip],
    });
  }

  onPickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    this.imageValue = file;
  }

  onSubmit() {
    this.loading = true;
    if (this.updateUserForm.invalid || this.updateOrderForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const userData = this.updateUserForm.value;
    const body = {
      ...userData,
      password: '12345678',
      identity_scan: this.imageValue,
    };
    if (!body.mobile.startsWith('+966') || !body.mobile.startsWith('966')) {
      body.mobile = `+966${body.mobile}`;
    }
    if (this.imageValue) {
      const formData = new FormData();
      const imageValue = this.imageValue;
      delete body.identity_scan;
      formData.append('identity_scan', imageValue);
      formData.append('data', JSON.stringify(body));
      return this.updateUser(formData);
    }
    this.updateUser(body);
  }
  updateUser(userData) {
    const orderData = this.updateOrderForm.value;
    this.bundlesService.updateUser(this.userId, userData).subscribe(res => {
      if (res?.body?.id) {
        orderData['user'] = res.body.id;
        orderData['agentId'] = localStorage.getItem('userId');
        this.updateOrder(orderData);
      } else {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري');
        this.loading = false;
      }
    }, err => {
      this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      this.loading = false;
    });
  }
  updateOrder(body) {
    this.ordersService.updateOrder(this.orderId, body).subscribe(
      response => {
        if (response?.body?._id) {
          this.loading = false;
          this.toastr.success('تم تعديل الطلب بنجاح');
          this.router.navigate(['/pages/orders/list']);
        } else {
          this.toastr.warning('حدث خطأ ما حاول مرة اخري');
          this.loading = false;
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
        this.loading = false;
      },
    );
  }
}
