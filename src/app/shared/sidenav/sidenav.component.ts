import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../../service/generic.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<Event>();
  isNavOpen = true;
  userDetails: any;
  // svpRoles = ['Hiring Manager','Hiring Manager 1', 'Hiring Manager 2']


  isDashboardActive = this.router.url.includes('dashboard') ? true : false;
  isLeadActive = this.router.url.includes('leads') ? true : false;
  isProposalActive = this.router.url.includes('proposals') ? true : false;
  isContactActive = this.router.url.includes('contacts') ? true : false;
  isAccountActive = this.router.url.includes('accounts') ? true : false;
  isJobReportActive = this.router.url.includes('job-reports') ? true : false;
  isManageUserActive = this.router.url.includes('manage') ? true : false;
  isDealActive = this.router.url.includes('deals') ? true : false;
  isReportActive = this.router.url.includes('reports') ? true : false;

  constructor(public router: Router, private genericService: GenericService) {}

  ngOnInit(): void {
    let userData = sessionStorage.getItem('user');
    this.userDetails = userData ? JSON.parse(userData) : '';
    // this.userId = sessionStorage.getItem('user')
    //   ? (JSON.parse(sessionStorage.getItem('user')).id)
    //   : '';
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/home']);
    window.scrollTo(0, 0);
  }
  toggleNav(data: any) {
    this.isNavOpen = !this.isNavOpen;
    if (this.isNavOpen) {
      data.isShowLogo = false;
    } else {
      data.isShowLogo = true;
    }
    this.menuClicked.emit(data);
  }

  hasAccess() {
    return this.userDetails.user_role === 'admin' ? true : false;
  }

  actviateNav(value: string) {
    this.isDashboardActive = value == 'dashboard' ? true : false;
    this.isLeadActive = value == 'leads' ? true : false;
    this.isContactActive = value == 'contacts' ? true : false;
    this.isAccountActive = value == 'accounts' ? true : false;
    this.isProposalActive = value == 'proposals' ? true : false;
    this.isJobReportActive = value == 'job-reports' ? true : false;
    this.isManageUserActive = value == 'manage' ? true : false;
    this.isDealActive = value == 'deals' ? true : false;
    this.isReportActive = value == 'reports' ? true : false;
  }
}
