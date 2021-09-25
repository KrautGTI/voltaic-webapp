import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { liveSearch } from 'src/app/common/live-search.operator';
import { HomeOwnerLabels } from 'src/app/shared/constants/proposal.constant';
import { FormField } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-home-owner',
  templateUrl: './home-owner.component.html',
  styleUrls: ['./home-owner.component.scss'],
})
export class HomeOwnerComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  @Input() public group: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = HomeOwnerLabels;
  private searchTerm$ = new Subject<string>();
  public states: { name: string; value: string }[] = [];

  readonly searchValues$ = this.searchTerm$.pipe(
    // liveSearch((term) => this.genericService.getAccounts())
    liveSearch((term) => of([]))
  );

  constructor() {}

  ngOnInit(): void {
    this.addCoSigner?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        // console.log('val=', val);
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  get addCoSigner(): AbstractControl | null {
    return this.group.get('Add_Co_Signer');
  }

  public onChangeState(term: string): void {
    this.searchTerm$.next(term);
  }
}
