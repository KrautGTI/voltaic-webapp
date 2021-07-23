import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GenericService } from '../../service/generic.service';
import { LoaderService } from "../../shared/loader/loader.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  userDetails: any;
  isAdmin = false;

  opportunityDetails: any;
  constructor(
    private genericService: GenericService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    this.userDetails = userData
      ? JSON.parse(userData)
      : null;
    this.isAdmin = this.userDetails.user_role === 'admin' ? true : false;
    this.loaderService.show();
    this.genericService.getDeals(this.userDetails.authorize_token, this.isAdmin).subscribe((userList: any) => {
      console.log(userList);
      if(userList?.message != 'Server Error' && userList?.error?.name != 'TokenExpiredError'){  
        this.opportunityDetails = userList.message;
        this.loaderService.hide();
      } else if(userList?.error?.name === 'TokenExpiredError'){
        const errMsg = "Session Expired !! Please login again.";
        Swal.fire({
          text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
          confirmButtonText: 'OK'
        }).then(res => {
          this.logout();
        });
      }
    }, (error) => {
        this.loaderService.hide();
        const errMsg = "Unable To fetch data. Please try again.";
        Swal.fire({
          text: errMsg, icon: 'error', confirmButtonColor: '#A239CA',
          confirmButtonText: 'OK'
        });
    });
    
  }

  onDealsClick(dealid:any) {
    console.log(dealid);
    this.router.navigate(['post-auth/deals/deal-details'], { queryParams: { dealId: dealid } });
   }

  logout() {
    this.genericService.logoutApi(this.userDetails.authorize_token).subscribe((data: any) => { 
      console.log(data);
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    });
  }
}
