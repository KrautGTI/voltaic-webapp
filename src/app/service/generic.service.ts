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
  private leadDetails:any;
  private appointmentDetails: any;
  private stateId:any;
  private leadId:any;
  private stateIdProject:any;
  private projectId:any;

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

  public setLeadData(leadDetails: any) {
    this.leadDetails = leadDetails;
  }

  public getLeadData() {
    return this.leadDetails;
  }
  public setAppointmentData(appointmentDetails: any) {
    this.appointmentDetails = appointmentDetails;
  }

  public getAppointmentData() {
    return this.appointmentDetails;
  }
  public setLeadId(leadId: any) {
    this.leadId = leadId;
  }

  public getLeadId() {
    return this.leadId;
  }

  public setProjectId(projectId: any) {
    this.projectId = projectId;
  }

  public getProjectId() {
    return this.projectId;
  }

  public setSelectedState(stateId: any) {
    this.stateId = stateId;
  }

  public getSelectedState() {
    return this.stateId;
  }

  public setSelectedStateProject(stateId: any) {
    this.stateIdProject = stateId;
  }

  public getSelectedStateProject() {
    return this.stateIdProject;
  }

  public setPassoword(resetForm: any) {
    const url = this.authServiceUrl + 'user/setPassword';
    return this.httpClient.post(url, resetForm);
  }
  public loadEvents(payload: any) {
    const url = this.authServiceUrl + 'event/getAllEvents ';
    return this.httpClient.post(url, payload);
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
  public saveEvents(data: any) {
    const url = this.authServiceUrl + 'event/saveUpdateEvent';
    return this.httpClient.post(url, data);
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

  public getStates() {
    const url = this.authServiceUrl + 'master/getStates';
    return this.httpClient.get(url);
  }

  public getUtiliesByStates(data: any): any {
    const url = this.authServiceUrl + 'master/getUtiliesByStates';
    return this.httpClient.post(url, data);
  }

  public getLeadsMaster() {
    const url = this.authServiceUrl + 'master/getLeadsMaster';
    return this.httpClient.get(url);
  }

  public getLeadsMasterById(leadId: any) {
    const url = this.authServiceUrl + 'master/getLeadsMasterById/' + leadId;
    return this.httpClient.get(url);
  }

  public addContactInfo(data: Folder): any {
    const url = this.authServiceUrl + 'master/addLead/contactInfo';
    return this.httpClient.post(url, data);
  }

  public addLeadInfo(data: Folder): any {
    const url = this.authServiceUrl + 'master/addLead/leadInfo';
    return this.httpClient.post(url, data);
  }

  public addUtilityInfo(data: Folder): any {
    const url = this.authServiceUrl + 'master/addLead/utilityInfo';
    return this.httpClient.post(url, data);
  }

  public addAppointment(data: Folder): any {
    const url = this.authServiceUrl + 'master/addLead/scheduleAppointment';
    return this.httpClient.post(url, data);
  }

  public editContactInfo(data: Folder): any {
    const url = this.authServiceUrl + 'master/editLead/contactInfo';
    return this.httpClient.post(url, data);
  }

  public editUtilityInfo(data: Folder): any {
    const url = this.authServiceUrl + 'master/editLead/utilityInfo';
    return this.httpClient.post(url, data);
  }

  public editLeadInfo(data: Folder): any {
    const url = this.authServiceUrl + 'master/editLead/leadInfo';
    return this.httpClient.post(url, data);
  }

  public editAppointment(data: Folder): any {
    const url = this.authServiceUrl + 'master/editLead/scheduleAppointment';
    return this.httpClient.post(url, data);
  }

}
