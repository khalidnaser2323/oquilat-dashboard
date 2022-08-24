import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BundlesService } from '../../../services/bundles/bundles.service';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss'],
})
export class OrderAddComponent implements OnInit {
  createUserForm: FormGroup;
  createOrderForm: FormGroup;
  imageValue: File;
  bundlesList: any;
  loading: boolean;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private bundlesService: BundlesService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.listBundles();
    this.buildCreateUserForm();
    this.buildCreateOrderForm();
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

  buildCreateUserForm() {
    this.createUserForm = this.fb.group({
      identification_number: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      type: ['customer'],
      email: [''],
      region: ['', Validators.required],
      address: ['', Validators.required],
      identity_scan: [''],
      notes: [''],
    });
  }

  buildCreateOrderForm() {
    this.createOrderForm = this.fb.group({
      type: ['', Validators.required],
      userType: ['', Validators.required],
      bundle: ['', Validators.required],
      secondary_ip: [''],
      primary_ip: [''],
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
    if (this.createUserForm.invalid || this.createOrderForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const userData = this.createUserForm.value;
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
      return this.addUser(formData);
    }
    this.addUser(body);
  }
  addUser(userData) {
    const orderData = this.createOrderForm.value;
    this.bundlesService.createUser(userData).subscribe(res => {
      if (res?.body?.id) {
        orderData['user'] = res.body.id;
        this.addOrder(orderData);
      } else {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري');
        this.loading = false;
      }
    }, err => {
      this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      this.loading = false;
    });
  }
  addOrder(body) {
    this.ordersService.createOrder(body).subscribe(
      response => {
        if (response?.body?._id) {
          this.loading = false;
          this.toastr.success('تم إضافة الطلب بنجاح');
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
