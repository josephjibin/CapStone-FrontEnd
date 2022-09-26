import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { AddEditRolesComponent } from './features/maintenance/roles/add-edit-roles/add-edit-roles.component';
import { ListRolesComponent } from './features/maintenance/roles/list-roles/list-roles.component';
import { AddEditUsersComponent } from './features/maintenance/users/add-edit-users/add-edit-users.component';
import { ListUsersComponent } from './features/maintenance/users/list-users/list-users.component';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { RegisterComponent } from './features/register/register.component';
import { AddCategoryComponent } from './features/maintenance/categories/add-category/add-category.component';

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
          {
            path: 'categories',
            children: [
              { path: 'add', component: AddCategoryComponent },
            ],
          },
          {
            path: 'roles',
            children: [
              { path: '', component: ListRolesComponent },
              { path: 'add', component: AddEditRolesComponent },
              { path: 'edit/:id', component: AddEditRolesComponent },
            ],
          },
          {
            path: 'users',
            children: [
              { path: '', component: ListUsersComponent },
              { path: 'add', component: AddEditUsersComponent },
              { path: 'edit/:id', component: AddEditUsersComponent },
            ],
          },
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
