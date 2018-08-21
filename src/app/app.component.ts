import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logged: Boolean = false;

  constructor(
  	private authenticationService: AuthenticationService,
  	private router: Router
  ) {

  	this.authenticationService.userLogged.subscribe(status => {
        this.logged = status;
    });
  }

  logOut() {
      this.authenticationService.logout();
      this.router.navigate(['/sign-in']);
      this.authenticationService.userLogged.next(false);
  } 	
}
