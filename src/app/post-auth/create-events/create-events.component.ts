import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    let leadDetails = this.genericService.getLeadData();
    console.log(leadDetails);
  }

}
