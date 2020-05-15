import { Component, OnInit, ElementRef, ViewChild, Self, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent<T extends {id: number, name: string}> implements OnInit, ControlValueAccessor {
  // Template reference value, so that we can acces this inside our component
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() label: string;
  @Input() Items: T[];
  @Input() selectedId: number;

  constructor(@Self() public controlDir: NgControl) {
    // This binds it to our class
    // and now we got access to our control directive inside our component / template
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    // We got the validation from the control value accessor
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    // fires after our sync validators
    // example if need todo a api call to check something
    const asyncValidators = control.asyncValidator
      ? [control.asyncValidator]
      : [];

    // passes the validator to this input (login as example) and set them at the same time.
    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);

    // Try and validate our form on init
    control.updateValueAndValidity();
  }

  onChange(event: number) {}

  onTouched() {}

  writeValue(obj: number): void {
    // we need to get the value of our input,and write it into this.
    // This gives our control value accessor acces to the values in our inputfield
    this.input.nativeElement.value = obj;

  }
  registerOnChange(fn: any): void {
    // set this to the control value accesor function
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // set this to the control value accesor function
    this.onTouched = fn;
  }
}
