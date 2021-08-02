import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrls: ['./btn-primary.component.scss'],
})
export class BtnPrimaryComponent implements OnInit {
  @Input() public btnName: string = '';
  @Input() public btnType: string = 'button';
  @Input() public class: string = 'btn-primary';
  @Input() public disabled: boolean = false;
  @Output() public btnClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
  public onClick(): void {
    this.btnClick.emit(true);
  }
}
