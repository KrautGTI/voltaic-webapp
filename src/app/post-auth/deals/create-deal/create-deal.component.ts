import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { LoaderService } from "../../../shared/loader/loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, NgModel } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.scss']
})
export class CreateDealComponent implements OnInit {
  dealForm: any;
  contactId: string = '';
  userDetails: any;
  isAdmin: boolean = false;
  constructor(private genericService: GenericService, private loaderService: LoaderService,
    private route: ActivatedRoute, private router: Router, private httpClient: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
      this.userDetails = userData
        ? JSON.parse(userData)
        : null;
      this.isAdmin = this.userDetails.user_role === 'admin' ? true : false;
      this.dealForm = this.formBuilder.group({
       Description: [""],
    });
    // this.genericService.getSources().subscribe((data: any) => {
    //   this.leadSources = data.message;
    // });
  }

  createDeal() { 
    
    
  }

  logout() {
    this.genericService.logoutApi(this.userDetails.authorize_token).subscribe((data: any) => { 
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    });
  }

}
