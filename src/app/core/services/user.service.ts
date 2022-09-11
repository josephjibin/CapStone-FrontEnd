import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/user`;
  }

  create(user: User) {
    return this.httpClient.post(this.baseUrl, user);
  }
}
