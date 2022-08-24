import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users/users.service';
@Component({
  selector: 'users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {
  createUserForm: FormGroup;
  imageValue: File;
  loading: boolean;
  rolesList = [
    { value: 'engineer', label: 'عضو فريق' },
    { value: 'admin', label: 'admin / مسؤل' },
  ];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.buildCreateUserForm();
  }

  buildCreateUserForm() {
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.createUserForm.invalid) {
      this.loading = false;
      this.toastr.info('برجاء تكملة الحقول المطلوبة');
      return;
    }
    const userData = this.createUserForm.value;

    if (!userData.mobile.startsWith('+966') || !userData.mobile.startsWith('966')) {
      userData.mobile = `+966${userData.mobile}`;
    }
    this.usersService.createUser(userData).subscribe(res => {
      if (res?.body?.id) {
        this.loading = false;
        this.toastr.success('تم الإضافة بنجاج');
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
