import { Component, OnInit } from '@angular/core';
import { RoutingStepsData } from 'src/app/shared/constants/report.constant';
import { RoutingStep } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss'],
})
export class ReportCreateComponent implements OnInit {
  public routingSteps: RoutingStep[] = RoutingStepsData;
  public moduleData = [];

  constructor() {}

  ngOnInit(): void {}
}
