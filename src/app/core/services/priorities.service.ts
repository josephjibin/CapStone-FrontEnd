import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Priorities } from '../models/priorities';

@Injectable({
  providedIn: 'root'
})
export class PrioritiesService {
  private baseUrlDemoPriorities;
  constructor(private httpClient: HttpClient) {
    this.baseUrlDemoPriorities = `${environment.baseUrlDemoPriorities}`;
  }

  getAll() {
    return this.httpClient.get<Priorities[]>(this.baseUrlDemoPriorities);
  }
  getById(roleId: string) {
    return roleId;
    //return this.httpClient.get<Role>(`${this.baseUrl}/${roleId}`);
  }
  
  delete(prioritiesId: string) {
    console.log(prioritiesId);
    //return this.httpClient.delete(`${this.baseUrlDemoPriorities}/${prioritiesId}`);
  }
  create(priority: Priorities) {
    console.log(priority.description);
    console.log(priority.name);
    //console.log(priority.id);
    //return this.httpClient.post(this.baseUrl, role);
  }
  update(prioritiesId: string, priority: Priorities) {
    console.log(prioritiesId);
    console.log(priority.description);
    console.log(priority.name);
    //return this.httpClient.put(`${this.baseUrl}/${roleId}`, role);
  }
}
