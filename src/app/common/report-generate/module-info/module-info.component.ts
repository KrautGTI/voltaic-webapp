import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-module-info',
  templateUrl: './module-info.component.html',
  styleUrls: ['./module-info.component.scss'],
})
export class ModuleInfoComponent implements OnInit {
  @Input() public moduleData = [];
  public moduleForm: FormGroup = new FormGroup({});
  public errors = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.moduleForm = this.fb.group({
      date: [''],
    });
  }
}
