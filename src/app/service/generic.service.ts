import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Account, Folder } from '../shared/models/data.model';
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

  public getAccountsForSearch() {
    this.isAdmin = this.authService.getIsAdmin();
    const url = this.authServiceUrl + 'accounts/getAccounts';
    if (this.isAdmin) {
      return this.httpClient
        .post(url, { role: 'admin' })
        .pipe(
          map((data: any) =>
            data && data.message && Array.isArray(data.message)
              ? data.message
              : []
          )
        );
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
  public getLeadOwnersWithUserFilter() {
    const roleName = this.authService.getRole();
    const loginId = this.authService.getUserId();
    const url = this.authServiceUrl + 'master/getLeadOwner';
    return this.httpClient.get(url).pipe(
      map((res: any) => (res && res.message ? res.message : [])),
      map((resArr: any[]) =>
        resArr.filter((item) => {
          return roleName === 'admin'
            ? item
            : item && item.login_id && item.login_id === loginId;
        })
      )
    );
  }
  public getMasterData() {
    return this.httpClient.get('assets/json/master.json');
  }

  public getDealsById(dealid: string) {
    const url = this.authServiceUrl + 'deals/getDealsById';
    return this.httpClient.post(url, { dealId: dealid });
  }

  public getDealsFromContact(contactid: string) {
    const url = this.authServiceUrl + 'contacts/getDealsFromContact';
    return this.httpClient.post(url, { contact_id: contactid });
  }
  public getDealsFromAccount(accountId: string) {
    const url = this.authServiceUrl + 'accounts/getDealsByAccount';
    return this.httpClient.post(url, { account_id: accountId });
  }
  public addModifyAccounts(data: Account): any {
    data.login_id = this.authService.getUserId();
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
  public addModifyFolder(data: Folder): any {
    const url = this.authServiceUrl + 'folder/addOrEditFolder';
    return this.httpClient.post(url, data);
  }
  public getFolders() {
    const url = this.authServiceUrl + 'folder/getFolders';
    return this.httpClient.post(url, null);
  }
}
