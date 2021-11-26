import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-validation-control',
  templateUrl: './form-validation-control.component.html',
  styleUrls: ['./form-validation-control.component.scss']
})
export class FormValidationControlComponent implements OnInit, OnChanges {
  @Input() control: any;
  @Input() errors: any;

  entries: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.entries = Object.entries(this.errors);
  }
}
