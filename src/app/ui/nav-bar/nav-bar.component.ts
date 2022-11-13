import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchService } from 'src/app/core/services/search.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userName: string;
  user: User | null;
  searchTerm!:string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private searchService :SearchService
  ) {
    this.userName = 'unknown user';
    this.user = null;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    if (this.user?.firstName) {
      this.userName = `${this.user?.firstName} ${this.user?.lastName}`;
    } else {
      this.userName = '';
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logoutUser() {
    this.authService.logout().subscribe({
      next: (data: any) => {
        console.log('here');
        this.tokenStorageService.clearToken();
        this.router.navigate(['/site/home']);
      },
      error: (error) => {
        console.log('here');
        this.alertService.error(error.error);
      },
    });
  }
  search(event :any){
this.searchTerm=(event.target as HTMLInputElement).value
this.searchService.search.next(this.searchTerm)
  }
}
