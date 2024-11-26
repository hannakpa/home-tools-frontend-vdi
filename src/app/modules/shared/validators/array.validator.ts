import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class ArrayValidators {
  static minSelected(min = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || !Array.isArray(control.value)) {
        // value is null or not an array
        return {minSelected: min, actualSelected: 0};
      } else if (control.value.length < min) {
        // not enough
        return {minSelected: min, actualSelected: control.value.length};
      } else {
        // good to go
        return null;
      }
    }
  }
}
