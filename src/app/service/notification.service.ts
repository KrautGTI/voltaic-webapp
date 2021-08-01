import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private genericService: GenericService,
    private authService: AuthService,
    private router: Router
  ) {}

  public error(errMsg: string, logOutRequired: boolean = false): void {
    Swal.fire({
      text: errMsg,
      icon: 'error',
      confirmButtonColor: '#A239CA',
      confirmButtonText: 'OK',
    }).then((res) => {
      if (logOutRequired) {
        this.logout();
      }
    });
  }
  public success(msg: string, redirectTo: string): void {
    Swal.fire({
      text: msg,
      icon: 'success',
      confirmButtonColor: '#A239CA',
      confirmButtonText: 'OK',
    }).then((res) => {
      if (redirectTo) {
        this.router.navigate([redirectTo], {
          replaceUrl: true,
        });
      }
    });
  }

  public logout() {
    this.genericService.logoutApi().subscribe((data: any) => {
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true,
      });
    });
  }
}
