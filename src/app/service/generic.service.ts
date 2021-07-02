import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  //authServiceUrl = environment.apiBaseUrl;
  authServiceUrl = 'http://voltaic.bigmarvconsulting.com/jsonapi/';
  userDetails: any;
  constructor(private httpClient: HttpClient) {}

  public loginUser(loginData: any) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/login';
    return this.httpClient.post(url, loginData, options);
  }

  public generateOTP(email: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/otpGen';
    return this.httpClient.post(url, email, options);
  }

  public setPassoword(resetForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/setPassword';
    return this.httpClient.post(url, resetForm, options);
  }

  public getJobReports(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/masterJobs';
    // if(isAdmin) {
    //   return this.httpClient.post(url, {role: 'admin'}, options);
    // } else {
      return this.httpClient.post(url, '', options);
    //}
  }

  public getAllUsers(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/getAllUsers';
    // if(isAdmin) {
    //   return this.httpClient.post(url, {role: 'admin'}, options);
    // } else {
      return this.httpClient.post(url, '', options);
   // }
  }

  public getLeadContacts(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
        Accept: 'application/json',
        authorize_token: token
      });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/getLeadsContacts';
    if(isAdmin) {
      return this.httpClient.post(url, {role: 'admin'}, options);
    } else {
      return this.httpClient.post(url, '', options);
    }
    
  }

  public logoutApi(token: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/logout';
    return this.httpClient.post(url, '', options);
  }

}
