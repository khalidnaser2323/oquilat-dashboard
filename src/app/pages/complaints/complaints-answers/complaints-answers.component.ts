import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComplaintsService } from '../../../services/complaints/complaints.service';
@Component({
  selector: 'complaints-answers',
  templateUrl: './complaints-answers.component.html',
  styleUrls: ['./complaints-answers.component.scss']
})
export class ComplaintsAnswersComponent implements OnInit {
  complaintId: any;
  currentComplaint: any;
  updateComplaintForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private complaintsService: ComplaintsService
  ) { }


  ngOnInit(): void {
    this.buildUpdateComplaintForm();
    this.route.params.subscribe(params => {
      this.complaintId = params['id'];
      this.loadComplaint(this.complaintId);
    });
  }
  loadComplaint(complaintId: any) {
    this.complaintsService.viewComplaint(complaintId).subscribe(
      response => {
        if (response?.body?._id) {
          this.currentComplaint = response.body;
          this.buildUpdateComplaintForm(this.currentComplaint);
        }
      },
    );
  }

  buildUpdateComplaintForm(Complaint?) {
    const fixedComplaint = Object.assign({
      question: '',
      answer: '',
    }, Complaint);


    this.updateComplaintForm = this.fb.group({
      question: [fixedComplaint.question, Validators.required],
      answer: [fixedComplaint.answer, Validators.required]
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.updateComplaintForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const data = this.updateComplaintForm.value;

    this.complaintsService.updateComplaint(this.complaintId, data).subscribe(res => {
      if (res?.body?.id) {
        this.loading = false;
        this.toastr.success('تم التعديل بنجاج');
        this.router.navigate([`/pages/complaints/answers/${this.complaintId}`]);
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
