import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ComplaintsService } from '../../../services/complaints/complaints.service';

@Component({
  selector: 'questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  complaintsList: any;
  selectedAll: any;
  activeComplaint: any;
  inActiveComplaint: any;
  AllComplaintCount: any;
  fileName = 'ExcelSheet.xlsx';
  closeResult: string;
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  images = ['https://st2.depositphotos.com/1092019/7050/i/600/depositphotos_70506257-stock-photo-complaints-concept-with-word-on.jpg'];
  complaintStatusList = [
    { label: 'مستلمة', value: 'received' },
    { label: 'قيد التنفيذ', value: 'handling' },
    { label: 'تم التنفيذ', value: 'resolved' },
  ];
  action: string;
  selectedComplaint: any;
  queries: any;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private complaintsService: ComplaintsService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queries => {
      this.queries = queries;
      this.listComplaints();
    });
  }

  listComplaints() {
    this.complaintsList = [];
    this.complaintsService.listQuestions(this.page, '', this.itemsPerPage, true, this.queries).subscribe(
      res => {
        if (res.body.complaints.length) {
          this.totalItems = Number(res.body.length);
          const subList = res.body.complaints.map((sub) => {
            sub.selected = false;
            return sub;
          });
          this.complaintsList = subList;
        }
      },
    );
  }


  onChange(status, complaint) {
    const body = {
      text: complaint.text,
      mobile: complaint.mobile,
      agentId: localStorage.getItem('userId'),
      status: [{
        type: [{ text: status }],
      }],
    };

    this.complaintsService.updateComplaintstatus(complaint._id, body).subscribe(
      (data) => {
        this.listComplaints();
        this.toastr.success('تم تعديل حالة السؤال بنجاح');
      },
      (err) => {
        if (err.error) {
          this.toastr.error('حدث خطأ اثناء تعديل حالة السؤال', 'حاول مرة اخري');
        }
      },
    );
  }

  loadPage(page: number) {
    this.page = page;
    this.listComplaints();
  }
  open(content, compalint?) {
    if (compalint) {
      this.selectedComplaint = compalint;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  sendAction() {
    if (!this.action) {
      this.toastr.info('يرجي ادخال الحقل');
      return;
    }
    const body = {
      text: this.selectedComplaint.text,
      mobile: this.selectedComplaint.mobile,
      agentId: localStorage.getItem('userId'),
      actionText: [{
        anwser: this.action,
        agentId: localStorage.getItem('userId'),
      }]
    };
    this.complaintsService.updateComplaintAction(this.selectedComplaint._id, body).subscribe(
      (data) => {
        this.listComplaints();
        this.modalService.dismissAll();
        this.toastr.success('تم إضافة ملاحظات السؤال بنجاح');
      },
      (err) => {
        if (err.error) {
          this.toastr.error('حدث خطأ اثناء  إضافة ملاحظات  السؤال', 'حاول مرة اخري');
        }
      },
    );
  }
}
