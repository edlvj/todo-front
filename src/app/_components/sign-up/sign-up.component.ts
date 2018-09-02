import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PasswordValidation } from '../../_helpers';
import { AuthenticationService } from '../../_services';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})

export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ngFlashMessageService: NgFlashMessageService,
        private authenticationService: AuthenticationService) {}
    
    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.compose([
               Validators.required, 
               Validators.minLength(3),
               Validators.maxLength(50)
            ])],
            password: ['', Validators.compose([
               Validators.required,
               Validators.minLength(8),
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

        this.authenticationService.sign_up(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.ngFlashMessageService.showFlashMessage({
                    messages: ["<strong>Well done!</strong> You’re successfully registered!"], 
                    dismissible: false, 
                    timeout: 3000,
                    type: 'success'
                  });
                  this.autoSignIn();
                },
                error => {
                    this.error = error;
                });

    }

  private autoSignIn() {
      this.authenticationService.sign_in(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.error = error;
                });

      this.authenticationService.userLogged.next(true);    
  }

}  