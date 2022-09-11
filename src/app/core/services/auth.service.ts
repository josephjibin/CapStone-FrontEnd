import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, Token, User } from '../models/models';
import { AlertService } from './alert.service';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl;

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.baseUrl = `${environment.baseUrl}/auth`;
  }

  public login(login: Login): Observable<Token> {
    return this.httpClient.post<Token>(
      `${this.baseUrl}/login`,
      login,
      httpOptions
    );
  }

  public logout(): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/logout`, httpOptions);
  }

  public getLoggedInUser(): User | null {
    if (this.isLoggedIn()) {
      const decoded = this.decodeJWT();
      return {
        lastName: decoded.family_name,
        firstName: decoded.given_name,
        email: decoded.email,
        id: decoded.nameid,
      } as User;
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const decoded = this.decodeJWT();

    if (decoded !== null) {
      return Date.now() > decoded.exp!;
    } else {
      return false;
    }
  }

  public isInRole(role: string): boolean {
    const decoded = this.decodeJWT();
    if (decoded !== null) {
      const roles =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (typeof roles === 'string') {
        return roles === role;
      } else if (typeof roles === 'object' && roles.length > 0) {
        return (roles as string[]).includes(role);
      }
      return false;
    } else {
      return false;
    }
  }

  public decodeJWT(): any | null {
    var token = this.tokenStorageService.getToken();

    if (token !== null && token != undefined) {
      return jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type;
    } else {
      return null;
    }
  }
}
