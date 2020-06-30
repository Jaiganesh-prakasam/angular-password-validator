import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
  static patternMatch(pattern: RegExp, errorObject: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const patternMatch = control.value.match(pattern);
      return patternMatch ? null : errorObject;
    };
  }
  static passwordPattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control.value.password === '' || control.value.mailId === '')) {
        const emailId = control.value.mailId.split('@');
        const password = control.value.password;
        const passwordCotainsMailId = password.includes(emailId[0]);
        return passwordCotainsMailId ? {passwordHasMailId: true} : null;
      }
    };
  }
}
