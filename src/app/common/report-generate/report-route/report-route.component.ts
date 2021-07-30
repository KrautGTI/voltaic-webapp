import { Component, OnInit, Input } from '@angular/core';
export class ModuleSelect {
  fieldName: string = '';
  fieldLabel: string = '';
  selectItem: boolean = false;
}

@Component({
  selector: 'app-report-route',
  templateUrl: './report-route.component.html',
  styleUrls: ['./report-route.component.scss'],
})
export class ReportRouteComponent implements OnInit {
  @Input() public moduleData = [];
  public isVisibleReportType = false;
  public isVisibleRepresentation = false;
  public selectedModuleArr: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  public btnSubmit(data: string[]): void {
    this.isVisibleReportType = true;
    console.log(data);
    this.selectedModuleArr = data;
  }
  public reportTypeSelected(type: string): void {
    this.isVisibleRepresentation = true;
    console.log('type=', type);
  }
  public reportColumnsSelected(data: ModuleSelect[]): void {
    console.log('data=', data);
  }
}
