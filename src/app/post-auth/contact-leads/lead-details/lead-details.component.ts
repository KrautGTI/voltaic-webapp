import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
  leadId = '';
  action = '';
  sub: any;
  constructor(private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
   this.sub = this.route.queryParams.subscribe((params) => {
      this.leadId = params.leadId;
      this.action = params.action
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}

}
