import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PasswordValidation } from '../_helpers';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})

export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}
    
    ngOnInit() {
        console.log(this.signupForm);
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.compose([
               Validators.required, 
               Validators.min(3),
               Validators.max(50)
            ])],
            password: ['', Validators.compose([
               Validators.required,
               Validators.min(8),
               Validators.pattern("^[a-zA-Z0-9]+$")
            ])],
            password_confirmation: ['', Validators.compose([
              Validators.required
            ])]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.signupForm.invalid) {
            return;
        }

        console.log('suck my dick');
    }    

}  