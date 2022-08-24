import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AreasService } from '../../../services/areas/areas.service';

@Component({
  selector: 'areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.scss'],
})

export class AreasListComponent implements OnInit {
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  areasList: any;
  activeTeam: boolean;
  constructor(
    private toastr: ToastrService,
    private areasService: AreasService,
  ) { }

  ngOnInit(): void {
    this.loadAreas();
  }
  loadAreas() {
    this.areasList = [];
    this.areasService.listAreas(this.page, '', this.itemsPerPage, true).subscribe(
      res => {
        if (res?.body?.allowedareas?.length) {
          this.totalItems = Number(res.body.length);
          this.areasList = res.body.allowedareas;
        }
      },
    );
  }

  deleteOneArea(areaId) {
    this.areasService.deleteArea(areaId).subscribe(
      response => {
        if (response.body) {
          this.loadAreas();
          this.toastr.success('تم حذف المنطقة بنجاح');
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      },
    );
  }

  loadPage(page: number) {
    this.page = page;
    this.loadAreas();
  }
}
