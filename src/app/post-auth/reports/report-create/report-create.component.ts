import { Component, OnInit } from '@angular/core';
import { RoutingStepsData } from 'src/app/shared/constants/report.constant';
import { RoutingStep } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss'],
})
export class ReportCreateComponent implements OnInit {
  public routingStepsData: RoutingStep[] = RoutingStepsData;
  public routingSteps: RoutingStep[] = [];
  public moduleData = [];

  constructor() {
    this.createClone();
  }

  ngOnInit(): void {}
  private createClone(): void {
    this.routingSteps = JSON.parse(JSON.stringify(this.routingStepsData));
  }
}
