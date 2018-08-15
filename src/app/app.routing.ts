import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

import { SignInComponent } from './sign-in';
import { SignUpComponent } from './sign-up';
import { ProjectsComponent } from './projects';

const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);