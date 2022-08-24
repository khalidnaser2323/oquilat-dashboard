import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class CanActivateAdminGuard implements CanActivate {
    status: any;
    constructor(private authService: AuthService, private router: Router) {
    }
    handleGuard() {
        return (this.authService.getUserRole() === 'admin' || this.authService.getUserRole() === 'engineer')
            ? true : this.router.navigateByUrl(`auth/login`);
    }

    canActivate() {
        return this.handleGuard();
    }
}
