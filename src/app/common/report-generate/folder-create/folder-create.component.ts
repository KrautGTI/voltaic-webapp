import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ReportFolderLabel } from 'src/app/shared/constants/report.constant';
import { FormField } from 'src/app/shared/models/util.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-folder-create',
  templateUrl: './folder-create.component.html',
  styleUrls: ['./folder-create.component.scss'],
})
export class FolderCreateComponent implements OnInit, OnDestroy {
  public folderForm: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = ReportFolderLabel;
  private unsubscribe$: Subject<boolean> = new Subject();
  public masterData: any = '';
  public leadOwners: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FolderCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialog: MatDialog,
    private authService: AuthService,
    private genericService: GenericService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    setTimeout(() => {
      this.fetchRequiredData();
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  private createForm(): void {
    this.folderForm = this.fb.group({
      folder_name: [''],
      viewType: [''],
      folder_desc: [''],
      view_only_user: [''],
      view_all: [''],
      view_by_group: [''],
      view_by_user: [''],
      view_by_role: [''],
    });
  }
  get viewType(): AbstractControl | null {
    return this.folderForm.get('viewType');
  }
  get folder_name(): AbstractControl | null {
    return this.folderForm.get('folder_name');
  }
  get folder_desc(): AbstractControl | null {
    return this.folderForm.get('folder_desc');
  }
  get viewOnlyUser(): AbstractControl | null {
    return this.folderForm.get('view_only_user');
  }
  get viewAll(): AbstractControl | null {
    return this.folderForm.get('view_all');
  }
  get selectedGroups(): AbstractControl | null {
    return this.folderForm.get('view_by_group');
  }
  get selectedUsers(): AbstractControl | null {
    return this.folderForm.get('view_by_user');
  }
  get selectedRoles(): AbstractControl | null {
    return this.folderForm.get('view_by_role');
  }
  private fetchRequiredData(): void {
    const reqs: Observable<any>[] = [];
    const getMasterData$ = this.genericService.getMasterData();
    const getLeadOwners$ = this.genericService.getLeadOwnersWithUserFilter();
    reqs.push(getMasterData$);
    reqs.push(getLeadOwners$);
    forkJoin(reqs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (results: any) => {
          if (results && Array.isArray(results)) {
            if (results[0]) {
              this.masterData = results[0];
            }
            if (results[1]) {
              this.leadOwners = results[1] ? results[1] : '';
            }
          }
        },
        (error: any) => {
          const errMsg = 'Unable To fetch data. Please try again.';
          this.notificationService.error(errMsg, false);
        }
      );
  }
  public onCancel(): void {
    this.dialogRef.close('closed');
  }
  public onSave(): void {
    if (this.folderForm.valid) {
      if (this.viewType?.value === 'selectedUser') {
        if (
          (this.selectedGroups?.value && this.selectedGroups?.value.length) ||
          (this.selectedUsers?.value && this.selectedUsers?.value.length) ||
          (this.selectedRoles?.value && this.selectedRoles?.value.length)
        ) {
          this.prepareSaveData();
        } else {
          const errMsg = 'Please select a value of Groups/Users/Roles';
          this.notificationService.error(errMsg);
        }
      } else {
        this.prepareSaveData();
      }
    }
  }
  private prepareSaveData(): void {
    const loginId = this.authService.getUserId();
    this.folder_desc?.patchValue(this.folder_name?.value);
    if (this.viewType?.value === 'onlyMe') {
      this.viewOnlyUser?.patchValue(loginId);
    } else if (this.viewType?.value === 'everyone') {
      this.viewAll?.patchValue(this.viewType?.value);
    } else if (this.viewType?.value === 'selectedUser') {
    }
    this.invokeSave();
  }
  private invokeSave(): void {
    console.log(this.folderForm.value);
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
        this.genericService
          .addModifyFolder(this.folderForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (dataValue: any) => {
              const successMsg = 'Folder Created Succesfully';
              this.notificationService.success(successMsg, '');

              this.dialogRef.close('saved');
            },
            (error: any) => {
              const errMsg = 'Unable To Save The Folder';
              this.notificationService.error(errMsg);
            }
          );
      }
    });
  }
}
