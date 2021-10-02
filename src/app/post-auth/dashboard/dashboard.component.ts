import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { ChartType } from 'chart.js';
// import * as Highcharts from 'highcharts';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userDetails: any;
  //stacked
  chartData: any[] = [];
  view: any[] = [800, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date Created';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Number of Leads';
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  //bar
  chartDataBar: any[] = [];
  viewBar: any[] = [800, 500];

  // options
  xAxisLabelBar: string = 'Date Created';
  yAxisLabelBar: string = 'Number of Projects';

  colorSchemeBar = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  constructor(private jwtHelperService: JwtHelperService) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    this.userDetails = userData ? JSON.parse(userData) : null;
    this.plotLeadGenaration();
    this.plotProjectByStage();
    // const decodedToken = this.jwtHelperService.decodeToken(this.userDetails.enz);
    // const expirationDate = this.jwtHelperService.getTokenExpirationDate(this.userDetails.enz);
    // const isExpired = this.jwtHelperService.isTokenExpired(this.userDetails.enz);
  }

  plotLeadGenaration() {
    this.chartData = [
      {
        "name": "10/03/2021",
        "series": [
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      },
    
      {
        "name": "09/29/2021",
        "series": [
          {
            "name": "2010",
            "value": 7870000
          },
          {
            "name": "2011",
            "value": 8270000
          }
        ]
      },
    
      {
        "name": "09/25/2021",
        "series": [
          {
            "name": "2010",
            "value": 5000002
          },
          {
            "name": "2011",
            "value": 5800000
          }
        ]
      }
    ]
    
  }


  plotProjectByStage() {
    this.chartDataBar = [
      {
        "name": "Site Survey",
        "value": 29
      },
      {
        "name": "QC Check",
        "value": 3
      },
      {
        "name": "FLA",
        "value": 8
      },
      {
        "name": "NTP",
        "value": 37
      },
      {
        "name": "Design",
        "value": 3
      },
      {
        "name": "Final Engineering",
        "value": 1
      },
      {
        "name": "Solar Permit",
        "value": 8
      },
      {
        "name": "Meter Spot",
        "value": 2
      },
      {
        "name": "Final Inception",
        "value": 22
      },
      {
        "name": "System Activation",
        "value": 1
      },
      {
        "name": "PTO",
        "value": 1
      }
    ];
  }

  onSelect(event:any) {
    console.log(event)
  }

  onSelectBar(event:any) {
    console.log(event)
  }
}
