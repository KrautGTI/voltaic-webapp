import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { UserDetailsModel } from '../models/util.model';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() toggleLogo: any;
  public userDetails: UserDetailsModel | null = null;
  isInit: boolean = false;
  constructor(
    public router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
  }

  logout() {
    Swal.fire({
      text: 'Do you want to exit?',
      icon: 'question',
      confirmButtonColor: '#A239CA',
      position: 'center',
      confirmButtonText: 'Yes',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'No',
    }).then((res) => {
      if (res.isConfirmed) {
        if (!this.authService.getAccessToken()) {
          sessionStorage.clear();
          this.router.navigate(['/login'], {
            replaceUrl: true,
          });
        } else {
          this.notificationService.logout();
        }
      }
    });
  }
}
