import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/users/login/login.component';
import { RegisterComponent } from './features/users/register/register.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'site/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'site',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'maintenance',
        children: [
        ],
      },
    ],
  },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
