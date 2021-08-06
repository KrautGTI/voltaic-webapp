import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/service/generic.service';
import { NotificationService } from 'src/app/service/notification.service';
import { BasicInfoFieldLabel } from 'src/app/shared/constants/report.constant';
import { FormField } from 'src/app/shared/models/util.model';
import { FolderCreateComponent } from '../folder-create/folder-create.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  @Output() public onSaveBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onRunBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCancelBtn: EventEmitter<any> = new EventEmitter<any>();
  public isVisibleBtn: boolean = false;
  public label: { [key: string]: FormField } = BasicInfoFieldLabel;
  public basicInfoForm: FormGroup = new FormGroup({});
  private unsubscribe$: Subject<boolean> = new Subject();
  public selectFolderArr: any[] = [];

  constructor(
    private fb: FormBuilder,
    private genericService: GenericService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.isVisibleBtn = true;
    this.createForm();
    this.fetchRequiredData();
  }
  private createForm(): void {
    this.basicInfoForm = this.fb.group({
      selectFolder: [''],
      reportName: [''],
      description: ['', []],
    });
  }
  get selectFolder(): AbstractControl | null {
    return this.basicInfoForm.get('selectFolder');
  }
  private fetchRequiredData(): void {
    const reqs: Observable<any>[] = [];
    const getFolders$ = this.genericService.getFolders();
    reqs.push(getFolders$);
    forkJoin(reqs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (results) => {
          if (results && Array.isArray(results)) {
            if (results[0]) {
              this.selectFolderArr =
                results[0].message && Array.isArray(results[0].message)
                  ? results[0].message
                  : [];
            }
          }
        },
        (error) => {
          const errMsg = 'Unable To fetch data. Please try again.';
          this.notificationService.error(errMsg, false);
        }
      );
  }
  public onRun(): void {
    this.onRunBtn.emit(this.basicInfoForm!.value);
  }
  public onSave(): void {
    this.onSaveBtn.emit(this.basicInfoForm!.value);
  }
  public onCancel(): void {
    this.onCancelBtn.emit(this.basicInfoForm!.value);
  }
  public onCreateFolder(): void {
    this.openDialog();
  }
  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.maxHeight = '550px';
    dialogConfig.width = '650px';
    const dialogRef = this.dialog.open(FolderCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
