import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BundlesService } from '../../../services/bundles/bundles.service';
@Component({
  selector: 'bundles-update',
  templateUrl: './bundles-update.component.html',
  styleUrls: ['./bundles-update.component.scss'],
})
export class BundlesUpdateComponent implements OnInit {
  updateBundleForm: FormGroup;
  loading: boolean;
  bundleId: any;
  currentBundle: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private bundlesService: BundlesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildCreateBundleForm();
    this.route.params.subscribe(params => {
      this.bundleId = params['id'];
      this.loadBundle(this.bundleId);
    });
  }
  loadBundle(bundleId: any) {
    this.bundlesService.viewBundle(bundleId).subscribe(
      response => {
        if (response?.body?._id) {
          this.currentBundle = response.body;
          this.buildCreateBundleForm(response.body);
        }
      },
    );
  }
  buildCreateBundleForm(bundle?) {
    const fixedBundle = Object.assign({
      name: '',
      price: null,
      speed: null,
      quota: null,
    }, bundle);
    this.updateBundleForm = this.fb.group({
      name: [fixedBundle.name, Validators.required],
      price: [fixedBundle.price, Validators.required],
      speed: [fixedBundle.speed, Validators.required],
      quota: [fixedBundle.quota, Validators.required],
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.updateBundleForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const bundleData = this.updateBundleForm.value;
    this.bundlesService.updateBundle(this.bundleId, bundleData).subscribe(res => {
      if (res?.body?._id) {
        this.loading = false;
        this.toastr.success('تم تعديل الباقة بنجاح');
        this.router.navigate(['/pages/bundles/list']);
      } else {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري');
        this.loading = false;
      }
    }, err => {
      this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      this.loading = false;
    });
  }
}
