import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
  // control value accessor 197 / 198 nog eens kijken
export class TextInputComponent implements OnInit, ControlValueAccessor {
  // Template reference value, so that we can acces this inside our component
  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  // Before we can begin with the validtion we need access to the control itself.
  // The way to do it is to inject it in our constructor.
  // En that means we can access its properties.

  // Public so that we can access it in our html template.
  // @Self is for angular dependency injection, and anguluar is going to look for where to locate what it's going to inject into itself.
  // And if we already have a service actived somewhere in our application is going to wake up the tree of the depencency hierarchy,
  // looking for something that matches what we're injecting here.
  // But if we use the self decorator here it's only going to use this inside itself and not look for any shared dependency,
  // that's allready in use.
  // So this guarantees that we are working with the very specific control that we are inject in here
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
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    // passes the validator to this input (login as example) and set them at the same time.
    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);

    // Try and validate our form on init
    control.updateValueAndValidity();
  }

  onChange(event) {}

  onTouched() {}

  writeValue(obj: any): void {
    // we need to get the value of our input,and write it into this.
    // This gives our control value accessor acces to the values in our inputfield
    this.input.nativeElement.value = obj || '';
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
