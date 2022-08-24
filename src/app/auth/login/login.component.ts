import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
  ) { }
  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.loading = true;
    const data = this.loginForm.value;
    this.auth.login(data).subscribe(response => {
      if (response.body && response.body.id) {
        this.auth.saveToken(response.body.token);
        this.auth.loadUser(response.body.id).subscribe(user => {
          this.loading = false;
          if (user?.body?._id) {
            this.auth.saveUserPhoneNumber(user.body.mobile);
            this.auth.saveUserId(user.body._id);
            this.auth.saveUserData(user.body);
            this.router.navigate(['/pages']);
            this.toastr.success('تم تسجيل الدخول بنجاح');
          }
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
    });
  }
}
