import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.scss'],
})
export class CreateDealComponent implements OnInit {
  dealForm: any;
  contactId: string = '';
  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dealForm = this.formBuilder.group({
      Description: [''],
    });
    // this.genericService.getSources().subscribe((data: any) => {
    //   this.leadSources = data.message;
    // });
  }

  createDeal() {}
}
