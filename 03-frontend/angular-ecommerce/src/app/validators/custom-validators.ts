import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    //minlength validation
    static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl) => {
            if ((control.value != null) && (control.value.trim().length < minLength && control.value.trim().length > 0)) {
                return { 'customMinlength': true };
            }
            else {
                return null;
            }
        }

    }

    //only whitespace validator 
    static onlyWhitespace(control: AbstractControl): ValidationErrors | null{

        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'onlyWhitespace': true };
        }
        else {
            return null;
        }


    }

    static checkPasswords(password: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (control.value === password) {
                return null;
            }
            else {
                return { 'notSame': true};
            }
        }

    }

    static MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const sourceCtrl = control.get(source);
          const targetCtrl = control.get(target);
    
          return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
            ? { 'mismatch': true }
            : null;
        };
      }
}
