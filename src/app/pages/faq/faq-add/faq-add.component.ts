import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FaqService } from '../../../services/faq/faq.service';

@Component({
  selector: 'faq-add',
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.scss'],
})
export class FaqAddComponent implements OnInit {
  createFaqForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private faqService: FaqService,
  ) { }

  ngOnInit(): void {
    this.buildCreateFaqForm();
  }

  buildCreateFaqForm() {
    this.createFaqForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.createFaqForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const data = this.createFaqForm.value;
    this.faqService.createFaq(data).subscribe(res => {
      if (res?.body?._id) {
        this.loading = false;
        this.toastr.success('تم الإضافة بنجاج');
        this.router.navigate(['/pages/faq/list']);
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
