import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './features/users/login/login.component';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';
import { RegisterComponent } from './features/users/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { AlertComponent } from './ui/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    PageNotFoundComponent,
    AlertComponent,
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
