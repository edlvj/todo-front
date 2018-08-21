import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
    signinForm: FormGroup;
    returnUrl: string;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
    ) {}


    ngOnInit() {
        this.signinForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });

        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.signinForm.controls; }

    onSubmit() {
        if (this.signinForm.invalid) {
            return;
        }

        this.authenticationService.sign_in(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });

        this.authenticationService.userLogged.next(true);    
    }
}