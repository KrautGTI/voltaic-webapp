import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic.service';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn } from '@angular/forms';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';
import { LeadInfoLabels } from 'src/app/shared/constants/lead.constant';
import { CreateEvent } from 'src/app/shared/constants/event.constant';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {
  public label: { [key: string]: FormField } = CreateEvent;
  public leadInfoForm: FormGroup = new FormGroup({});
  assignedTo : any;
  masterData : any;
  masterDataTime : any;
  leadDetails : any;
  appointmentDetails: any;
  masterStatus: any;
  sub: any;
  action: any;

  taskData = [{
    name : 'Appointment'
  }];

  constructor(private genericService: GenericService,
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.leadDetails = this.genericService.getLeadData();
    this.appointmentDetails = this.genericService.getAppointmentData();
    this.sub = this.route.queryParams.subscribe((params) => {
      this.action = params.action;
    });
    this.genericService.getLeadOwners().subscribe((data: any) => {
      this.assignedTo = data.message;
    });
    console.log(this.leadDetails);
    this.createForm();
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      this.masterDataTime = this.masterData.Time;
      this.masterStatus = this.masterData.status;
    });
    this.setFormControlValue();
  }
  private setFormControlValue(): void {
    this.leadDetails = this.genericService.getLeadData();
    console.log(this.leadDetails);
    if (this.action == 'view') {
      this.leadInfoForm.patchValue({
        assignedTo: this.leadDetails.master_lead_owner,
        task: 'Appointment',
      })
    } else {
      let arr = this.appointmentDetails.date_time.split(" ");
      this.leadInfoForm.patchValue({
        assignedTo: this.appointmentDetails.assigned_to,
        task: this.appointmentDetails.event_task,
        notes: this.appointmentDetails.notes,
        status: this.appointmentDetails.status,
        date: arr[0],
        time: arr[arr.length-2] + " " + arr[arr.length-1]
      })
      console.log('this.leadInfoForm', this.leadInfoForm);
    }
    
  }
  private createForm(): void {
    this.leadInfoForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.leadInfoForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
    console.log('1',this.leadInfoForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.leadInfoForm.get(name);
  }

  public saveDeal() {
    if (this.leadInfoForm.valid) {
      let saveData = { ...this.leadInfoForm.value};
      if (this.action = 'edit') {
        saveData['operation'] = 'update';
      } else {
        saveData['operation'] = 'insert';
      }
      if (!saveData.notes) {
        saveData.notes = "";
      }
      saveData['leadId'] = this.leadDetails.master_lead_owner_id;
      console.log('saveData=', saveData);
      Swal.fire({
        text: 'Do You Want To Save Changes?',
        icon: 'question',
        confirmButtonColor: '#A239CA',
        position: 'center',
        confirmButtonText: 'Yes',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'No',
      }).then((res) => {
        if (res.isConfirmed) {
          this.genericService.saveEvents(saveData).subscribe((dataValue: any) => {
            Swal.fire({
              text: 'Appointment Saved Successfully',
              icon: 'info',
              confirmButtonColor: '#A239CA',
              position: 'center',
              confirmButtonText: 'Continue',
              showConfirmButton: true
            }).then((res) => {
              if (res.isConfirmed) {
                this.router.navigate(['post-auth/leads']);
              }
            })
          }, (error: any) => {
            const errMsg = 'Unable To Save The Data';
            this.notificationService.error(errMsg);
          });
        }
      });
  } else {
      Swal.fire({
        text: 'Appointment Saved Successfully',
        icon: 'info',
        confirmButtonColor: '#A239CA',
        position: 'center',
        confirmButtonText: 'Continue',
        showConfirmButton: true
      }).then((res) => {
        if (res.isConfirmed) {
          this.router.navigate(['post-auth/leads']);
        }
      })
  }
  }
}
