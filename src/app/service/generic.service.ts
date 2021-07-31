import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private authServiceUrl = environment.apiBaseUrl;
  private isAdmin: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

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

  public getJobReports() {
    const url = this.authServiceUrl + 'masterJob/masterJobs';
    return this.httpClient.post(url, '');
  }

  public getAllUsers() {
    const url = this.authServiceUrl + 'masterJob/getAllUsers';
    return this.httpClient.post(url, '');
  }

  public getLeads() {
    this.isAdmin = this.authService.getIsAdmin();
    const url = this.authServiceUrl + 'masterJob/getLeadsContacts';
    if (this.isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }

  public getDeals() {
    this.isAdmin = this.authService.getIsAdmin();
    const url = this.authServiceUrl + 'deals/getDealsDashboard';
    if (this.isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }
  public logoutApi() {
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

  public getAccounts() {
    this.isAdmin = this.authService.getIsAdmin();
    const url = this.authServiceUrl + 'accounts/getAccounts';
    if (this.isAdmin) {
      return this.httpClient.post(url, { role: 'admin' });
    } else {
      return this.httpClient.post(url, '');
    }
  }

  public getContacts() {
    this.isAdmin = this.authService.getIsAdmin();
    const url = this.authServiceUrl + 'contacts/getContacts';
    if (this.isAdmin) {
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

  public getDealsById(dealid: string) {
    const url = this.authServiceUrl + 'deals/getDealsById';
    return this.httpClient.post(url, { dealId: dealid });
  }

  public getDealsFromContact(contactid: string) {
    const url = this.authServiceUrl + 'contacts/getDealsFromContact';
    return this.httpClient.post(url, { contact_id: contactid });
  }
  public addModifyAccounts(data: any): any {
    const url = this.authServiceUrl + 'accounts/addModifyAccounts';
    return this.httpClient.post(url, data);
  }

  public addModifyContact(contactDetails: any) {
    const url = this.authServiceUrl + 'contacts/addModifyContacts';
    return this.httpClient.post(url, contactDetails);
  }

  public addModifyDeals(data: any): any {
    const url = this.authServiceUrl + 'deals/addOrEditDeals';
    return this.httpClient.post(url, data);
  }
}
