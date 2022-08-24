import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  itemsPerPage: number = 20;
  totalItems: any = 0;
  page: any = 1;
  previousPage: any;
  usersList: any;
  activeTeam: boolean;
  queris: any;
  spinnerLoading = false;
  @ViewChild('input') input: ElementRef;
  noUsers: boolean;
  subscription: Subscription;
  isInputShown = false;
  totalItemsPagination: any = 0;

  constructor(
    private toastr: ToastrService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(queries?) {
    this.queris = queries;
    if (queries) {
      this.activeTeam = true;
    } else {
      this.activeTeam = false;
    }
    this.usersList = [];
    this.usersService.listUsers(this.page, '', this.itemsPerPage, true, queries).subscribe(
      res => {
        if (res.body.users.length) {
          this.loadAllUsers();
          this.totalItems = Number(res.body.length);
          this.totalItemsPagination = Number(res.body.length);
          this.usersList = res.body.users;
        }
      }, err => {
        this.noUsers = true;
      },
    );
  }
  loadAllUsers() {
    this.usersService.listAllUsers().subscribe(
      res => {
        if (res?.body?.users.length) {
          localStorage.setItem('allUsersList', JSON.stringify(res.body.users));
        }
      },
    );
  }
  search(term) {
    const users = JSON.parse(localStorage.getItem('allUsersList'));
    if (!users) {
      this.spinnerLoading = false;
      this.loadAllUsers();
      return;
    }
    const matches = users.filter(s => {
      return s && s.name && s.name.toString().toLowerCase().includes(term) ||
        s && s.mobile && s.mobile.toString().toLowerCase().includes(term) ||
        s && s.email && s.email.toString().toLowerCase().includes(term) ||
        s && s.region && s.region.toString().toLowerCase().includes(term) ||
        s && s.address && s.address.toString().toLowerCase().includes(term) ||
        s && s.identification_number && s.identification_number.toString().toLowerCase().includes(term);
    },
    );
    console.log('matches', matches);
    this.totalItemsPagination = matches.length;
    if (matches && matches.length) {
      this.usersList = matches;
      this.spinnerLoading = false;
      this.noUsers = false;
    } else {
      this.noUsers = true;
      this.spinnerLoading = false;
      this.usersList = [];
    }

  }

  deleteOneuser(bundleId) {
    if (!this.activeTeam) {
      this.toastr.info('لا يمكنك حذف مستخدم');
      return;
    }
    this.usersService.deleteUser(bundleId).subscribe(
      response => {
        if (response.body) {
          this.loadUsers(this.queris);
          this.toastr.success('تم حذف العميل بنجاح');
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
      },
    );
  }

  loadPage(page: number) {
    this.page = page;
    this.loadUsers(this.queris);
  }


  showInput() {
    this.isInputShown = true;
    this.input.nativeElement.focus();
  }

  hideInput() {
    this.isInputShown = false;
  }



  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        tap((text) => {
          const term = this.input.nativeElement.value;
          if (!term) {
            this.spinnerLoading = false;
            this.loadUsers(this.queris);
            return;
          }
          this.search(term);
        }),
      ).subscribe();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
