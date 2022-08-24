import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FaqService } from '../../../services/faq/faq.service';
@Component({
  selector: 'faq-update',
  templateUrl: './faq-update.component.html',
  styleUrls: ['./faq-update.component.scss'],
})
export class FaqUpdateComponent implements OnInit {
  updateFaqForm: FormGroup;
  loading: boolean;
  faqId: any;
  currentFaq: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private faqService: FaqService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.buildUpdateFaqForm();
    this.route.params.subscribe(params => {
      this.faqId = params['id'];
      this.loadFaq(this.faqId);
    });
  }
  loadFaq(faqId: any) {
    this.faqService.viewFaq(faqId).subscribe(
      response => {
        if (response?.body?._id) {
          this.currentFaq = response.body;
          this.faqId = response.body._id;
          this.buildUpdateFaqForm(this.currentFaq);
        }
      },
    );
  }

  buildUpdateFaqForm(faq?) {
    this.updateFaqForm = this.fb.group({
      question: [faq?.question, Validators.required],
      answer: [faq?.answer, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.updateFaqForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const data = this.updateFaqForm.value;
    this.faqService.updateFaq(this.faqId, data).subscribe(res => {
      if (res?.body?._id) {
        this.loading = false;
        this.toastr.success('تم التعديل بنجاج');
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
