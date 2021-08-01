import { Component, OnInit, Input } from '@angular/core';
import { RoutingStep } from 'src/app/shared/models/util.model';
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
  @Input() public routingSteps: RoutingStep[] = [];
  @Input() public moduleData = [];
  public selectedModuleArr: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  public btnSubmit(data: any, stepId: string, i: number): void {
    switch (stepId) {
      case 'moduleInfo':
        this.selectedModuleArr = data;
        break;
      case 'reportType':
        console.log('type=', data);
        break;
      case 'reportRepresentation':
        console.log('type=', data);
        break;
      case 'reportFilter':
        break;
    }
    this.setNextStepVisible(stepId, i);
  }
  private setNextStepVisible(stepId: string, index: number): void {
    if (this.routingSteps.length - 1 > index) {
      this.routingSteps[index + 1].isVisible = true;
    }
  }
}
