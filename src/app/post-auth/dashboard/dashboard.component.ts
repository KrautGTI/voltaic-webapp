import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userDetails: any;

  constructor(
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    this.userDetails = userData ? JSON.parse(userData) : null;

    // const decodedToken = this.jwtHelperService.decodeToken(this.userDetails.enz);
    // const expirationDate = this.jwtHelperService.getTokenExpirationDate(this.userDetails.enz);
    // const isExpired = this.jwtHelperService.isTokenExpired(this.userDetails.enz);
  }
}
