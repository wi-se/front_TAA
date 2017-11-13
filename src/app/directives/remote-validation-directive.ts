import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { UserService } from '../../services/user.service'; 
@Directive({
    selector: '[validateUnique][formControlName],[validateUnique][formControl],[validateUnique][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => UniqueValidator), multi: true }
    ]
})
export class UniqueValidator implements Validator {
    constructor( @Attribute('validateUnique') public validateUnique: string, private userService: UserService) {}

    validate(c: AbstractControl): { [key: string]: any } {
        let v = c.value;
        this.userService.remoteValidate(this.validateUnique, v).subscribe(res => {
           let obj = res.json();
            if(obj.exist) {
                c.setErrors({'validateUnique': true})
            }
        });
        return null;

    }
}