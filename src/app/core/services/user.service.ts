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

  getAll() {
    return this.httpClient.get<User[]>(this.baseUrl);
  }
  
  getById(userId: string) {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`);
  }

  create(user: User) {
    return this.httpClient.post(this.baseUrl, user);
  }

  update(userId: string, user: User) {
    return this.httpClient.put(`${this.baseUrl}/${userId}`, user);
  }

  delete(userId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${userId}`);
  }
}
