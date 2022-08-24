import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class CanActivateAnonymous implements CanActivate {
    status: any;
    constructor(private authService: AuthService, private router: Router) {
    }
    handleGuard() {
        const token = localStorage.getItem('userToken');
        return token !== null ? this.router.navigateByUrl(`pages/`) : true;
    }

    canActivate() {
        return this.handleGuard();
    }
}
