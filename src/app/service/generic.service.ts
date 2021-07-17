import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  authServiceUrl = environment.apiBaseUrl;
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
      return this.httpClient.post(url, '', options);
  }

  public getAllUsers(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/getAllUsers';
      return this.httpClient.post(url, '', options);
  }

  public getLeads(token: string, isAdmin: boolean) {
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

  public getDeals(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
        Accept: 'application/json',
        authorize_token: token
      });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'deals/getDealsDashboard';
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

  public getRoles() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });  
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/getRole';
      return this.httpClient.get(url, options);
  }

  public registerUser(registerData: any) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/addUser';
    return this.httpClient.post(url, registerData, options);
  }

  public getAccounts(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
        Accept: 'application/json',
        authorize_token: token
      });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'accounts/getAccounts';
    if(isAdmin) {
      return this.httpClient.post(url, {role: 'admin'}, options);
    } else {
      return this.httpClient.post(url, '', options);
    }   
  }

  public getContacts(token: string, isAdmin: boolean) {
    const headers = new HttpHeaders({
        Accept: 'application/json',
        authorize_token: token
      });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'contacts/getContacts';
    if(isAdmin) {
      return this.httpClient.post(url, {role: 'admin'}, options);
    } else {
      return this.httpClient.post(url, '', options);
    }
    
  }

}
