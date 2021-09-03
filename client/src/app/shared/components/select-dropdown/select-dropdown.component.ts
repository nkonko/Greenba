import { Component, OnInit, ElementRef, ViewChild, Self, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent<T extends {id: number, name: string}> implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() label: string;
  @Input() Items: T[];
  @Input() selectedId: number;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator
      ? [control.asyncValidator]
      : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);

    control.updateValueAndValidity();
  }

  onChange(event: number) {}

  onTouched() {}

  writeValue(obj: number): void {
    this.input.nativeElement.value = obj;

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
