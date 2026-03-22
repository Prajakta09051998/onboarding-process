import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Utility } from './utility';

//Form validations
export var emailRegex = /^(([^|\\<>/()\[\]\,;:@\ "]+(\[^<>()\[\]\,;:\s@\"])*)|(\"\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^0-9<>/()[\]\.,;:\s@\"]{2,4})$/;
export var requiredValidation = [Validators.required];
export var emailValidation = [Validators.required, Utility.emailPattern];

export const emailPatternValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const emailRegex = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*[a-zA-Z0-9]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  const value = control.value;

  if (!value) {
    return null;
  }

  return emailRegex.test(value) ? null : { invalidEmail: true };
};

export var mobileValidation = [
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10),
  Utility.mobileNoPattern,
];

export function numericPatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Allow empty value
    }
    const regex = /^[0-9]*$/;
    const isValid = regex.test(control.value);
    return isValid ? null : { numericPattern: true }; // Return error if invalid
  };
}
