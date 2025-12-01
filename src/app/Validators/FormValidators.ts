import {FormControl, ValidationErrors} from '@angular/forms';

export class FormValidators {
  static notOnlySpaces(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length == 0)) {
      return { notOnlySpaces: true};
    }
    return null;
  }

  static forbiddenWord(word: string): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const forbidden = new RegExp(word, 'i').test(control.value);
      return forbidden ? { forbiddenWord: true } : null;
    };
  }

  static minValue(value: number): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      if (control.value < value) {
        return { minValue: true };
      }
      return null;
    }
  }

  static allowedExtension(regex: RegExp): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const allowed = regex.test(control.value);
      return allowed ? null : { allowedExtension: true };
    };
  }
}
