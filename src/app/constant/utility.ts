import { FormControl, ValidationErrors } from "@angular/forms";

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
public static emailPattern(c: FormControl): ValidationErrors | null {
    let email_regex_1 =
      // /^(([^|\\<>/()\[\]\,;:@\ "]+(\[^<>()\[\]\,;:\s@\"])*)|(\"\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^0-9<>/()[\]\.,;:\s@\"]{2,4})$/; // Regular Expression 1
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email_regex_2 =
      /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-]{2,9})+\.)+([a-zA-Z0-9]{2,4})+$/; // Regular Expression 2

    if (!c.value) {
      return null;
    }

    return email_regex_1.test(c.value) && email_regex_2.test(c.value)
      ? null
      : {
        pattern: {
          valid: false,
        },
      };
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