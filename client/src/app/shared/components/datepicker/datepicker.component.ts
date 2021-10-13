import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatepickerComponent),
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor{

  constructor() { }

  @Input() placeholder: string;

  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  public value: Date;

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public onValueChange(value) {
    this.onChangeCallback(value);
  }

}
