import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/role`;
  }

  getAll() {
    return this.httpClient.get<Role[]>(this.baseUrl);
  }
  
  getById(roleId: string) {
    return this.httpClient.get<Role>(`${this.baseUrl}/${roleId}`);
  }

  create(role: Role) {
    return this.httpClient.post(this.baseUrl, role);
  }

  update(roleId: string, role: Role) {
    return this.httpClient.put(`${this.baseUrl}/${roleId}`, role);
  }

  delete(roleId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${roleId}`);
  }
}
