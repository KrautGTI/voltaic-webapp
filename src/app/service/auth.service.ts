import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsModel } from '../shared/models/util.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: any;
  private userDetails: UserDetailsModel | null = null;

  constructor(private router: Router) {}

  private setUserData(): void {
    this.userData = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : null;
  }
  public getUserDetails(): UserDetailsModel {
    this.setUserData();
    const userDetails = this.userData ? JSON.parse(this.userData) : null;
    this.userDetails = userDetails;
    return userDetails;
  }

  public getIsAdmin(): boolean {
    this.getUserDetails();
    return this.userDetails && this.userDetails.user_role === 'admin'
      ? true
      : false;
  }

  public getAccessToken(): string {
    this.getUserDetails();
    const authorize_token = this.userDetails
      ? this.userDetails.authorize_token
      : '';
    return authorize_token;
  }
  public getUserName(): string {
    this.getUserDetails();
    const user_name = this.userDetails ? this.userDetails.user_name : '';
    return user_name;
  }
  public getRole(): string {
    this.getUserDetails();
    const user_role = this.userDetails ? this.userDetails.user_role : '';
    return user_role;
  }
  public isLoggedIn(): boolean {
    return this.isTokenExpired() ? false : true;
  }

  private parseJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2));
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  private isTokenExpired(): boolean {
    const token = this.getAccessToken();
    return !token;
    // if (token) {
    //   const jwt = this.parseJWT(token);
    //   const currentTime = new Date().getTime() / 1000;
    //   const expTime = jwt.exp ? jwt.exp : 0;
    //   return currentTime > expTime ? true : false;
    // }
    // return true;
  }
}
