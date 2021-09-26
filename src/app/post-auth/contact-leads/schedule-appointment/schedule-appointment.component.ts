import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../service/generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormField, UserDetailsModel } from 'src/app/shared/models/util.model';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

import { ScheduleAppointmentLabels } from 'src/app/shared/constants/lead.constant';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {

  public scheduleAppointmemtForm: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = ScheduleAppointmentLabels;
  isSubmitClicked = false;
  timeIntervals = [];
  masterData:any;
  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.httpClient.get('assets/json/master.json').subscribe((masterData) => {
      this.masterData = masterData;
      this.timeIntervals = this.masterData.Time;
      this.createForm();
    });
    // this.scheduleAppointmemtForm = this.formBuilder.group({
    //   scheduleDate: [''],
    //   scheduleTime: [''],
    //   salesRep: ['']
    // });
  }

  private createForm(): void {
    this.scheduleAppointmemtForm = this.formBuilder.group({
    });
    Object.keys(this.label).forEach((key: string) => {
      const fieldName = this.label[key].fieldName;
      this.scheduleAppointmemtForm.addControl(
        fieldName,
        this.createControl(this.label[key])
      );
    });
   
    console.log(this.scheduleAppointmemtForm);
  }
  private createControl(field: FormField): any {
    const validation: ValidatorFn[] = [];
    const disabled = false;
    const value = '';
    return this.formBuilder.control({ disabled, value }, validation);
  }

  public getControl(name: string): AbstractControl | null {
    return this.scheduleAppointmemtForm.get(name);
  }

  submitSceduleAppointmentInfo() {
    this.isSubmitClicked = true;
    console.log(this.scheduleAppointmemtForm);
    if (
      this.scheduleAppointmemtForm.valid
    ) {
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
          const scheduleAppointmentData = {
          };
          console.log(scheduleAppointmentData);
        }
      });
    }
  }

}
