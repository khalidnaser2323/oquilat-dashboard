import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BundlesService } from '../../../services/bundles/bundles.service';
@Component({
  selector: 'bundles-add',
  templateUrl: './bundles-add.component.html',
  styleUrls: ['./bundles-add.component.scss'],
})
export class BundlesAddComponent implements OnInit {
  createBundleForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private bundlesService: BundlesService,
  ) { }

  ngOnInit(): void {
    this.buildCreateBundleForm();
  }
  buildCreateBundleForm() {
    this.createBundleForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      speed: [null, Validators.required],
      quota: [null, Validators.required],
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.createBundleForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const bundleData = this.createBundleForm.value;
    this.bundlesService.createBundle(bundleData).subscribe(res => {
      if (res?.body?._id) {
        this.loading = false;
        this.toastr.success('تم إضافة الباقة بنجاح');
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
