import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentChecked,
  ChangeDetectorRef,
  Output, EventEmitter
} from "@angular/core";
import { Subject, Subscription, timer } from "rxjs";
import { Router } from "@angular/router";
import { takeUntil, delay } from "rxjs/operators";
import { GenericService } from '../../service/generic.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  @Output() menuClicked = new EventEmitter<Event>();
  isNavOpen = true;
  userDetails: any;
  userId: string;
 // svpRoles = ['Hiring Manager','Hiring Manager 1', 'Hiring Manager 2']
  constructor(
    private router: Router,
    private genericService:GenericService
  ) { this.userId = '1';}

  ngOnInit(): void {
    // this.userDetails = sessionStorage.getItem('user')
    //   ? JSON.parse(sessionStorage.getItem('user'))
    //   : '';
    // this.userId = sessionStorage.getItem('user')
    //   ? (JSON.parse(sessionStorage.getItem('user')).id)
    //   : '';
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/home"]);
    window.scrollTo(0, 0);
  }
  toggleNav(data: any) {
    this.isNavOpen = !this.isNavOpen;
    if(this.isNavOpen) {
      data.isShowLogo = false;
    } else {
      data.isShowLogo = true;
    }
    this.menuClicked.emit(data);
  }

  hasAccess() {
   // return this.genericService.hasSVPAccess(this.userDetails.role);
  }
}

