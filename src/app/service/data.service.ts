import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {

  private dataSource = new BehaviorSubject({});
  private progressDataSource = new BehaviorSubject({
    contactInfo: 'notVisited',
    utilityInfo: 'notVisited',
    leadInfo: 'notVisited',
    appointment: 'notVisited'
  });
  currentData = this.dataSource.asObservable();
  currentPogressData = this.progressDataSource.asObservable();

  private dataSourceProject = new BehaviorSubject({});
  private progressDataSourceProject = new BehaviorSubject({
    contactInfo: 'notVisited',
    saleInfo: 'notVisited',
    otherInfo: 'notVisited'
  })
  currentDataProject = this.dataSourceProject.asObservable();
  currentPogressDataProject = this.progressDataSourceProject.asObservable();

  constructor() {
   // localStorage.setItem("userSessionProgressData", JSON.stringify({this.progressDatSource}))
  }

  changeValue(data: any) {
    this.dataSource.next(data);

    let localStorageValue = localStorage.getItem('userSessionData');


    if (localStorageValue) {
   //   localStorage.setItem("userSessionData", JSON.stringify({ ...localStorageValue, ...data }));
    } else {
      localStorage.setItem("userSessionData", JSON.stringify(data));
    }

  }
  changeStatus(data: any) {
    this.progressDataSource.next(data);
    let localStorageProgressValue = localStorage.getItem('userSessionProgressData');
    if (localStorageProgressValue) {
      console.log(data);
      localStorage.setItem("userSessionProgressData", JSON.stringify(data));
    } else {
      localStorage.setItem("userSessionProgressData", JSON.stringify(data));
    }
  }

  changeStatusProject(data: any) {
    this.progressDataSourceProject.next(data);
    let localStorageProgressValue = localStorage.getItem('userSessionProgressDataProject');
    if (localStorageProgressValue) {
      console.log(data);
      localStorage.setItem("userSessionProgressDataProject", JSON.stringify(data));
    } else {
      localStorage.setItem("userSessionProgressDataProject", JSON.stringify(data));
    }
  }

}