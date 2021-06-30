import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from './../../service/generic.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() toggleLogo: any;
  //userDetails;
  constructor(public router: Router, private genericService: GenericService,
    private loaderService: LoaderService) {}

  ngOnInit(): void {
    // const details = sessionStorage.getItem('user');
    // this.userDetails = details ? JSON.parse(details) : '';
  }

  logout() {
    Swal.fire({
      text: 'Do you want to exit?', icon: 'question', confirmButtonColor: '#00bcd4', position: 'center',
      confirmButtonText: 'Yes', showConfirmButton: true, showCancelButton: true, cancelButtonText: 'No'
    }).then(res => {
      if (res.isConfirmed) {
        // this.loaderService.show();
        // const loginId = {
        //   login_id: this.userDetails.login_id,
        // };
        // this.genericService
        //   .logoutUser(loginId, this.userDetails.access_token)
        //   .subscribe((data: any) => {
        //     sessionStorage.clear();
        //     this.router.navigate(['logout']);
        //   },error => {
        //     this.loaderService.hide();
        //   });
        }
    });
  }
}
