import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './features/login/login.component';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';
import { HomeComponent } from './features/home/home.component';
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ListUsersComponent } from './features/maintenance/users/list-users/list-users.component';
import { AddEditUsersComponent } from './features/maintenance/users/add-edit-users/add-edit-users.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { AlertComponent } from './ui/alert/alert.component';
import { AddEditRolesComponent } from './features/maintenance/roles/add-edit-roles/add-edit-roles.component';
import { ListRolesComponent } from './features/maintenance/roles/list-roles/list-roles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './features/register/register.component';
import { AddEditCategoriesComponent } from './features/maintenance/categories/add-edit-categories/add-edit-categories.component';
import { ListCategoriesComponent } from './features/maintenance/categories/list-categories/list-categories.component';
import { ListPrioritiesComponent } from './features/maintenance/priorities/list-priorities/list-priorities.component';
import { AddEditPrioritiesComponent } from './features/maintenance/priorities/add-edit-priorities/add-edit-priorities.component';
import { ListTodoComponent } from './features/todos/list-todo/list-todo.component';
import { AddEditTodosComponent } from './features/todos/add-edit-todos/add-edit-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    ListUsersComponent,
    AddEditUsersComponent,
    PageNotFoundComponent,
    AlertComponent,
    AddEditRolesComponent,
    ListRolesComponent,
    AddEditCategoriesComponent,
    ListCategoriesComponent,
    ListPrioritiesComponent,
    AddEditPrioritiesComponent,
    AddEditTodosComponent,
    ListTodoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
