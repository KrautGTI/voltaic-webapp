import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private authServiceUrl = environment.apiBaseUrl;
  private userDetails: any;
  constructor(private httpClient: HttpClient) {}

  public loginUser(loginData: any) {
    const url = this.authServiceUrl + 'user/login';
    return this.httpClient.post(url, loginData);
  }

  public generateOTP(email: any) {
    const url = this.authServiceUrl + 'user/otpGen';
    return this.httpClient.post(url, email);
  }

  public setPassoword(resetForm: any) {
    const url = this.authServiceUrl + 'user/setPassword';
    return this.httpClient.post(url, resetForm);
  }

  public getJobReports(token: string, isAdmin: boolean) {
    const url = this.authServiceUrl + 'masterJob/masterJobs';
    return this.httpClient.post(url, '');
  }

  public getAllUsers(token: string, isAdmin: boolean) {
    const url = this.authServiceUrl + 'masterJob/getAllUsers';
    return this.httpClient.post(url, '');
  }

  public getLeads(token: string, isAdmin: boolean) {
    const url = this.authServiceUrl + 'masterJob/getLeadsContacts';
    if (isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }

  public getDeals(token: string, isAdmin: boolean) {
    const url = this.authServiceUrl + 'deals/getDealsDashboard';
    if (isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }
  public logoutApi(token: string) {
    const url = this.authServiceUrl + 'user/logout';
    return this.httpClient.post(url, '');
  }

  public getRoles() {
    const url = this.authServiceUrl + 'user/getRole';
    return this.httpClient.get(url);
  }

  public registerUser(registerData: any) {
    const url = this.authServiceUrl + 'user/addUser';
    return this.httpClient.post(url, registerData);
  }

  public getAccounts(token: string, isAdmin: boolean) {
    const url = this.authServiceUrl + 'accounts/getAccounts';
    if (isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }

  public getContacts(token: string, isAdmin: boolean) {
    const url = this.authServiceUrl + 'contacts/getContacts';
    if (isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }

  public getMentors() {
    const url = this.authServiceUrl + 'master/getAllMentors';
    return this.httpClient.get(url);
  }

  public getMarketers() {
    const url = this.authServiceUrl + 'master/getAllMarketers';
    return this.httpClient.get(url);
  }

  public getStages() {
    const url = this.authServiceUrl + 'master/getStages';
    return this.httpClient.get(url);
  }

  public getSources() {
    const url = this.authServiceUrl + 'master/getSources';
    return this.httpClient.get(url);
  }

  public getEnergyConsultant() {
    const url = this.authServiceUrl + 'master/getEnergyConsultant';
    return this.httpClient.get(url);
  }

  public getSecondMarketers() {
    const url = this.authServiceUrl + 'master/getSecondMarketers';
    return this.httpClient.get(url);
  }

  public getLeadOwners() {
    const url = this.authServiceUrl + 'master/getLeadOwner';
    return this.httpClient.get(url);
  }

  public getDealsById(token: string, dealid: string) {
    const url = this.authServiceUrl + 'deals/getDealsById';
    return this.httpClient.post(url, { dealId: dealid });
  }

  public getDealsFromContact(token: string, contactid: string) {
    const url = this.authServiceUrl + 'contacts/getDealsFromContact';
    return this.httpClient.post(url, { contact_id: contactid });
  }
}
