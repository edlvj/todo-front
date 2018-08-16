import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

import { SignInComponent } from './_components/sign-in';
import { SignUpComponent } from './_components/sign-up';
import { HomeComponent } from './_components/home';

const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);