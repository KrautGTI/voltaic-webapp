import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from './../../service/generic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() toggleLogo: any;
  userDetails: any;
  isInit: boolean = false;
  constructor(public router: Router, private genericService: GenericService) {}

  ngOnInit(): void {
    let userData = sessionStorage.getItem('user');
    this.userDetails = userData ? JSON.parse(userData) : '';
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
        if (!this.userDetails?.authorize_token) {
          sessionStorage.clear();
          this.router.navigate(['/login'], {
            replaceUrl: true,
          });
        } else {
          this.genericService
            .logoutApi(this.userDetails.authorize_token)
            .subscribe(
              (data: any) => {
                sessionStorage.clear();
                this.router.navigate(['/login'], {
                  replaceUrl: true,
                });
              },
              (error) => {}
            );
        }
      }
    });
  }
}
