
import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AsYouType, isValidNumber } from 'libphonenumber-js';
import { Country } from '../../models/country';

@Component({
  selector: 'app-dropdown-wrapper',
  templateUrl: './dropdown-wrapper.component.html',
  styleUrls: ['./dropdown-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownWrapperComponent),
      multi: true
    }
  ]
})
export class DropdownWrapperComponent implements OnInit, ControlValueAccessor {
  @Input() public countries: Country[];
  public selectedCountry: Country = null;
  public numberControl: FormControl = new FormControl();

  public ngOnInit() {
    this.numberControl.valueChanges.subscribe((inputValue) => {
        this.writeValue(inputValue);
    });
  }

  onChange = (phoneNumber: string): void => {};

  onTouched = (): void => {};

  writeValue(phoneNumber: string): void {
    if (this.selectedCountry) {
      const parsedNumber = new AsYouType(this.selectedCountry.alpha2Code).input(phoneNumber);
      const fullNumber = `+${this.selectedCountry.callingCodes[0]} ${parsedNumber}`;
      this.numberControl.setValue(parsedNumber, { emitEvent: false });
      this.onChange(isValidNumber(fullNumber) ? fullNumber : null);
    }
  }

  registerOnChange(fn: (phoneNumber: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
