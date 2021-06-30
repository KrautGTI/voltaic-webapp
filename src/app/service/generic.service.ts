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

  public setPassoword(resetForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     // accesss_token: token,
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'user/setPassword';
    return this.httpClient.post(url, resetForm, options);
  }

  public getJobReports(token: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/masterJobs';
    return this.httpClient.post(url, '', options);
  }

  public getAllUsers(token: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/getAllUsers';
    return this.httpClient.post(url, '', options);
  }

  public getLeadContacts(token: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      authorize_token: token
    });
    const options = { headers: headers };
    const url = this.authServiceUrl + 'masterJob/getLeadsContacts';
    return this.httpClient.post(url, '', options);
  }

}
