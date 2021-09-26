import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-post-auth',
  templateUrl: './post-auth.component.html',
  styleUrls: ['./post-auth.component.scss'],
})
export class PostAuthComponent implements OnInit, AfterViewInit {
  @ViewChild(HeaderComponent)
  // private headerComp: HeaderComponent;
  public toggleLogoEvent = false;
  isDashboard = false;
  urlname = '';
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
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
    setTimeout(() => {
      this.toggleLogoEvent = false;
    }, 100);
    this.showBreadcrumb();
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
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
    if (this.router.url.includes('events')) {
      this.urlname = 'Events';
    }
    if (this.router.url.includes('create-events')) {
      this.urlname = 'Events - Create Events';
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
    if (this.router.url.includes('proposals')) {
      this.urlname = 'Proposals';
    }
  }

  toggleHeaderLogo(evnt: any) {
    console.log(evnt);
    this.toggleLogoEvent = evnt.isShowLogo;
  }

  goToCreateContact() {
    this.router.navigate(['post-auth/contacts/create-contact']);
  }

  goToCreateDeal() {
    this.router.navigate(['post-auth/deals/create-deal']);
  }
  public goToCreateAccount(): void {
    this.router.navigate(['post-auth/accounts/create-account']);
  }
  public goToProposal(): void {
    this.router.navigate(['post-auth/proposals/create-proposal']);
  }
  public goToCreateReport(): void {
    this.router.navigate(['post-auth/reports/create-report']);
  }
  public goToCreateLead(action: string): void {
    this.router.navigate(['post-auth/leads/lead-details'], {
      queryParams: { action: action }
    });
  }
  
}
