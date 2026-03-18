import { FormControl } from "@angular/forms";

export class Utility {

 static getErrorMessage(controlName: string, label: string, form: any) {

  if (!form) return null;

  const control = form.get(controlName);

  if (!control) return null;

  if (control.errors?.['required']) {
    return `${label} is required`;
  }

  if (control.errors?.['email']) {
    return `Enter valid ${label}`;
  }

  if (control.errors?.['minlength']) {
    return `${label} minimum length required`;
  }

  if (control.errors?.['pattern']) {
    return `Enter valid ${label}`;
  }

  return null;
}
public static mobileNoPattern(c: FormControl) {
    var mobileFilter = /^([0-9])\1{9}$/;
    if (mobileFilter.test(c.value)) {
      return {
        pattern: {
          valid: false,
        },
      };
    }
    var mobileFilter = /([0-9])\1{5,}/;
    if (mobileFilter.test(c.value)) {
      return {
        pattern: {
          valid: false,
        },
      };
    }
    var mobileFilter = /^([6-9]{1}[0-9]{9})$/;
    if (!mobileFilter.test(c.value)) {
      return {
        pattern: {
          valid: false,
        },
      };
    }
    if (c.value.substring(6, 10) == '0000') {
      var mobileFilter = /^(?!(\d)\1{5})\d{6}([0]{4})$/;
      if (!mobileFilter.test(c.value)) {
        return {
          pattern: {
            valid: false,
          },
        };
      }
    }
    return null;
  }
}