import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GenericService } from '../service/generic.service';
import { LoaderService } from '../shared/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isForgotPassword = false;
  buttonName = '';
  userDetails: any;
  isLoginClicked = false;
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private genericService: GenericService
  ) {}

  ngOnInit(): void {
    this.loaderService.hide();
    this.isForgotPassword = history?.state?.formResetPassword;
    this.buttonName = this.isForgotPassword ? 'Reset Password' : 'Login';
    if (this.isForgotPassword) {
     const userData = sessionStorage.getItem('user');
     this.userDetails = userData ? JSON.parse(userData) : null;
    } else {
      this.router.navigate(['/']);
    }
  }

  loginUser(loginForm: any) {
    this.isLoginClicked = true;
    const formValue = loginForm.form.value
    if(!formValue?.email || !formValue?.password) {
      return;
    }

    this.loaderService.show();
    if (this.isForgotPassword) {
      this.genericService
        .setPassoword(formValue)
        .pipe(tap(() => this.loaderService.hide()))
        .subscribe((data) => {
          if (data) {
            this.router.navigate(['login']);
          }
        });
    } else {
      this.genericService
        .loginUser(formValue)
        .pipe(tap(() => this.loaderService.hide()))
        .subscribe((data: any) => {
          console.log(data);
          this.isLoginClicked = false;
          if(data.error) {
            Swal.fire({
              text: data.error, icon: 'error', confirmButtonColor: '#00bcd4',
              confirmButtonText: 'OK'
            });
          } else {
            sessionStorage.setItem('user', JSON.stringify(data));
            // if (data.is_first_access === 'Y') {
            //   this.router.navigate(['reset-password'], {
            //     state: { formResetPassword: true },
            //   });
            // } else {
              this.router.navigate(['post-auth/dashboard', data.user_loginId]);
           // }
           }
        }, (error) => {
            this.loaderService.hide();
            const errMsg = "Unable To Login !! Please, try again..";
            Swal.fire({
              text: errMsg, icon: 'error', confirmButtonColor: '#00bcd4',
              confirmButtonText: 'OK'
            });
        }); 
    // }
  }
}

forgotPassword() {
  this.router.navigate(['forgot-password'], {
    state: { formResetPassword: true },
  });
}

}
