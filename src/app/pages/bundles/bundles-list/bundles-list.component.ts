import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BundlesService } from '../../../services/bundles/bundles.service';

@Component({
  selector: 'bundles-list',
  templateUrl: './bundles-list.component.html',
  styleUrls: ['./bundles-list.component.scss'],
})
export class BundlesListComponent implements OnInit {
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  bundlesList: any;
  agentRole: any;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private bundlesService: BundlesService,
  ) { }

  ngOnInit(): void {
    this.loadBundles();
    this.agentRole = this.authService.getUserRole();
  }
  loadBundles() {
    this.bundlesService.listBundles(this.page, '', this.itemsPerPage, true).subscribe(
      res => {
        if (res.body.bundles.length) {
          this.totalItems = Number(res.body.length);
          this.bundlesList = res.body.bundles;
        }
      },
    );
  }

  deleteOneBundle(bundleId) {
    this.bundlesService.deleteBundle(bundleId).subscribe(
      response => {
        if (response.body) {
          this.loadBundles();
          this.toastr.success('تم حذف الباقة بنجاح');
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      },
    );
  }

  loadPage(page: number) {
    this.page = page;
    this.loadBundles();
  }
}
