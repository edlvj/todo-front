import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value;
       let confirmPassword = AC.get('password_confirmation').value;
        if(password != confirmPassword) {
            AC.get('password_confirmation').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}