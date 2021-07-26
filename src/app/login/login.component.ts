import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GenericService } from '../service/generic.service';
import { LoaderService } from '../shared/loader/loader.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  isForgotPassword = false;
  isPasswordMatched = false;
  buttonName = '';
  userDetails: any;
  isLoginClicked = false;
  passwordFormValue : any;
  loginFormValue : any;
  loginFormData: any;
  passwordFormData: any;
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private genericService: GenericService,
    private jwtHelperService : JwtHelperService
  ) {}

  ngOnInit(): void {
    if(this.router.url.includes('login')){
      history.pushState(false, '', null);
    }
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
    if(this.isForgotPassword) {
      this.passwordFormValue = loginForm.form.value;
      console.log(this.passwordFormValue);
      if(!this.passwordFormValue?.fullname || !this.passwordFormValue?.email || !this.passwordFormValue?.password) {
        return;
      } else if(!this.passwordFormValue?.confirmpassword || 
        (this.passwordFormValue?.confirmpassword !== this.passwordFormValue?.password)) {
        this.isPasswordMatched = false;
        return;
      } else {
        this.loaderService.show();
        this.isPasswordMatched = true;
        this.passwordFormData = {
          name: this.passwordFormValue?.fullname,
          email: this.passwordFormValue?.email,
          password: this.passwordFormValue?.password,
        }
      }
    } else {
      this.loginFormValue = loginForm.form.value;
      if(!this.loginFormValue?.email || !this.loginFormValue?.password) {
        return;
      } else {
        this.loaderService.show();
        this.loginFormData = {
          email: this.loginFormValue?.email,
          password: this.loginFormValue?.password
        }
      }
    }
    if (this.isForgotPassword) {
      this.genericService.generateOTP({email: this.passwordFormValue?.email})
      .pipe(tap(() => this.loaderService.hide()))
      .subscribe((data) => {
        console.log(data);
        Swal.fire({
          html: `<p style="color: #bc51e8; font-size: 16px; margin-top: 20px;">An OTP Sent to Your Email-id. Please Enter the OTP to Verify.</p><input type="text" id="otp" class="swal2-input" placeholder="Enter OTP">`,
          confirmButtonText: 'Validate',
          confirmButtonColor: '#A239CA',
          focusConfirm: false,
          preConfirm: () => {
            const otpVal = (<HTMLInputElement>Swal?.getPopup()?.querySelector('#otp')).value
            if (!otpVal) {
              Swal.showValidationMessage(`Please enter otp`)
            }
            return { otp: otpVal }
          }
        }).then((result) => {
          this.loaderService.show();
          this.passwordFormData['otp'] = result?.value?.otp;
          console.log(this.passwordFormData);
          this.genericService
          .setPassoword(this.passwordFormData)
          .pipe(tap(() => this.loaderService.hide()))
          .subscribe((data) => {
            if (data) {
              Swal.fire({
                text: 'Reset Password is Successful.', icon: 'success', confirmButtonColor: '#A239CA',
                confirmButtonText: 'OK'
              }).then(res => {
                this.loaderService.show();
                this.router.navigate(['/login'], {
                  replaceUrl: true
                });
              });
            }
          });
        });
      });
      
    } else {
      this.genericService
        .loginUser(this.loginFormData)
        .pipe(tap(() => this.loaderService.hide()))
        .subscribe((data: any) => {
          console.log(data);
          this.isLoginClicked = false;
          if(data.error) {
            Swal.fire({
              text: data.error, icon: 'error', confirmButtonColor: '#A239CA',
              confirmButtonText: 'OK'
            });
          } else {
            //sessionStorage.setItem('user', JSON.stringify(data));
             const decodedToken = this.jwtHelperService.decodeToken(data.enz);
             console.log(decodedToken);
             const userDetails = {
              authorize_token: decodedToken.login_id.authorize_token,
              user_name: decodedToken.login_id.user_name,
              user_role: decodedToken.login_id.user_role,
              user_loginId: decodedToken.login_id.user_loginId,
             };
             sessionStorage.setItem('user', JSON.stringify(userDetails));
            //  sessionStorage.setItem('token', decodedToken.login_id.authorize_token);
            //  sessionStorage.setItem('userName', decodedToken.login_id.user_name);
            //  sessionStorage.setItem('role', decodedToken.login_id.user_role);
            this.router.navigate(['post-auth/dashboard']);
           }
        }, (error) => {
            this.loaderService.hide();
            const errMsg = "Unable To Login !! Please, try again..";
            Swal.fire({
              text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
              confirmButtonText: 'OK'
            });
        }); 
  }
}

forgotPassword() {
  this.isForgotPassword = true;
  this.router.navigate(['forgot-password'], {
    state: { formResetPassword: true },
  });
}

@HostListener('window:popstate', ['$event'])
onPopState(event: any) {
  if(this.router.url.includes('login')){
    history.pushState(null, '', null);
  }
}
}
