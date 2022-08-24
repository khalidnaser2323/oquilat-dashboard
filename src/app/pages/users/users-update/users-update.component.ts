import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss'],
})
export class UsersUpdateComponent implements OnInit {
  updateUserForm: FormGroup;
  imageValue: File;
  loading: boolean;
  rolesList = [
    { value: 'engineer', label: 'عضو فريق' },
    { value: 'admin', label: 'admin / مسؤل' },
  ];
  userId: any;
  currentUser: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.buildUpdateUserForm();
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUser(this.userId);
    });
  }
  loadUser(userId: any) {
    this.usersService.viewUser(userId).subscribe(
      response => {
        if (response?.body?._id) {
          this.currentUser = response.body;
          this.userId = response.body._id;
          this.buildUpdateUserForm(this.currentUser);
        }
      },
    );
  }

  buildUpdateUserForm(user?) {
    const fixedUser = Object.assign({
      name: '',
      password: '',
      mobile: '',
      roles: '',
    }, user);

    if (fixedUser.mobile.startsWith('+966')) {
      let newNumber = fixedUser.mobile;
      newNumber = newNumber.replace('+966', '');
      fixedUser.mobile = newNumber;
    }
    if (fixedUser.mobile.startsWith('966')) {
      let newNumber = fixedUser.mobile;
      newNumber = newNumber.replace('966', '');
      fixedUser.mobile = newNumber;
    }

    this.updateUserForm = this.fb.group({
      name: [fixedUser.name, Validators.required],
      password: [fixedUser.password, Validators.required],
      mobile: [fixedUser.mobile, Validators.required],
      type: [fixedUser.roles[0], Validators.required]
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.updateUserForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const userData = this.updateUserForm.value;
    if (!userData.mobile.startsWith('+966') || !userData.mobile.startsWith('966')) {
      userData.mobile = `+966${userData.mobile}`;
    }
    this.usersService.updateUser(this.userId, userData).subscribe(res => {
      if (res?.body?.id) {
        this.loading = false;
        this.toastr.success('تم التعديل بنجاج');
        this.router.navigate(['/pages/team/list']);
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
