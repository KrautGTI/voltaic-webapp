import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GenericService } from '../service/generic.service';
import Swal from 'sweetalert2';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  isPasswordMatched = true;
  userDetails: any;
  isButtonClicked = false;
  registerFormValue: any;
  registerFormData: any;
  roles: any;
  roleId: string = '-1';
  constructor(
    private router: Router,
    private genericService: GenericService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.genericService.getRoles().subscribe((data) => {
      console.log(data);
      this.roles = JSON.parse(JSON.stringify(data)).message;
    });
  }

  registerUser(registerForm: any) {
    this.isButtonClicked = true;

    this.registerFormValue = registerForm.form.value;
    if (
      !this.registerFormValue?.email ||
      !this.registerFormValue?.fullname ||
      !this.registerFormValue?.phone ||
      this.registerFormValue?.role === '-1' ||
      !this.registerFormValue?.dob ||
      !this.registerFormValue?.password
    ) {
      return;
    } else if (
      !this.registerFormValue?.confirmpassword ||
      this.registerFormValue?.confirmpassword !==
        this.registerFormValue?.password
    ) {
      this.isPasswordMatched = false;
      return;
    } else {
      this.registerFormData = {
        name: this.registerFormValue?.fullname,
        email: this.registerFormValue?.email,
        password: this.registerFormValue?.password,
        phone: this.registerFormValue?.phone,
        dob: this.registerFormValue?.dob,
        roleId: this.registerFormValue?.role,
        website: this.registerFormValue?.website,
      };

      this.genericService
        .generateOTP({ email: this.registerFormValue?.email })
        .subscribe((data) => {
          console.log(data);
          Swal.fire({
            html: `<p style="color: #bc51e8; font-size: 16px; margin-top: 20px;">An OTP Sent to Your Email-id. Please Enter the OTP to Verify.</p><input type="password" id="otp" class="swal2-input" placeholder="Enter OTP">`,
            confirmButtonText: 'Validate',
            confirmButtonColor: '#A239CA',
            focusConfirm: false,
            preConfirm: () => {
              const otpVal = (<HTMLInputElement>(
                Swal?.getPopup()?.querySelector('#otp')
              )).value;
              if (!otpVal) {
                Swal.showValidationMessage(`Please enter otp`);
              }
              return { otp: otpVal };
            },
          }).then((result) => {
            this.registerFormData['otp'] = result?.value?.otp;
            console.log(this.registerFormData);
            this.genericService.registerUser(this.registerFormData).subscribe(
              (data: any) => {
                console.log(data);
                this.isButtonClicked = false;
                if (data?.message?.message == 'OTP Not Verified') {
                  this.notificationService.error(data?.message?.message);
                } else {
                  this.notificationService.success(
                    data?.message?.message,
                    '/login'
                  );
                }
              },
              (error) => {
                const errMsg = 'Unable To Register !! Please, try again..';
                this.notificationService.error(errMsg);
              }
            );
          });
        });
    }
  }
}
