import { Component, OnInit, Input } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
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
  isDashboard = false;
  urlname = '';
  constructor(
    public router: Router, private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.showBreadcrumb();
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();

    this.showBreadcrumb();
  }

  showBreadcrumb() {
    this.isDashboard = this.router.url.includes('dashboard') ? true : false;
    if (this.router.url.includes('job-reports')) {
      this.urlname = 'Job Reports';
    } else if (this.router.url.includes('reports/create-report')) {
      this.urlname = 'Create Report';
    } else if (this.router.url.includes('reports')) {
      this.urlname = 'Reports';
    }
    if (this.router.url.includes('manage/users')) {
      this.urlname = 'Manage Users';
    }
    if (this.router.url.includes('leads')) {
      this.urlname = 'Leads';
    }
    if (this.router.url.includes('contacts')) {
      this.urlname = 'Contacts';
    }
    if (this.router.url.includes('contacts/create-contact')) {
      this.urlname = 'Create Contact';
    }
    if (this.router.url.includes('contact-details')) {
      this.urlname = 'Contact Details';
    }
    if (this.router.url.includes('account-details')) {
      this.urlname = 'Account Details';
    }
    if (this.router.url.includes('accounts')) {
      this.urlname = 'Accounts';
    }
    if (this.router.url.includes('deals')) {
      this.urlname = 'Deals';
    }
    if (this.router.url.includes('deals/create-deal')) {
      this.urlname = 'Create Deal';
    }
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
