import { Component } from '@angular/core';
import { Login, User } from 'src/app/core/models/models';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model = new Login();
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    this.authService.login(this.model).subscribe({
      next: (data) => {
        this.tokenStorageService.saveToken(data.token!);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (error) => {
        this.alertService.error(error.error);
        this.isLoginFailed = true;
        this.submitted = false;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
