import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { liveSearch } from 'src/app/common/live-search.operator';
import { HomeOwnerLabels } from 'src/app/shared/constants/proposal.constant';
import { FormField } from 'src/app/shared/models/util.model';

@Component({
  selector: 'app-home-owner',
  templateUrl: './home-owner.component.html',
  styleUrls: ['./home-owner.component.scss'],
})
export class HomeOwnerComponent implements OnInit {
  @Input() public group: FormGroup = new FormGroup({});
  public label: { [key: string]: FormField } = HomeOwnerLabels;
  private searchTerm$ = new Subject<string>();
  public states: { name: string; value: string }[] = [];

  readonly searchValues$ = this.searchTerm$.pipe(
    // liveSearch((term) => this.genericService.getAccounts())
    liveSearch((term) => of([]))
  );

  constructor() {}

  ngOnInit(): void {}

  public onChangeState(term: string): void {
    this.searchTerm$.next(term);
  }
}
