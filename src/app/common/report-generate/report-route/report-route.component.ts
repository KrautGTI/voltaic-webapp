import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-route',
  templateUrl: './report-route.component.html',
  styleUrls: ['./report-route.component.scss'],
})
export class ReportRouteComponent implements OnInit {
  @Input() public moduleData = [];

  constructor() {}

  ngOnInit(): void {}
}
