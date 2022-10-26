import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  Priorities } from '../models/priorities';


@Injectable({
  providedIn: 'root',
})
export class PrioritiesService {
  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/priority`;

  }

  create(priority: Priorities) {
    return this.httpClient.post(this.baseUrl,priority);
  }

  getAll() {
    return this.httpClient.get<Priorities[]>(this.baseUrl);
  }

  getById(priorityId: string) {
    return this.httpClient.get<Priorities>(`${this.baseUrl}/${priorityId}`);
  }

  update(priorityId: string, priority: Priorities) {
    return this.httpClient.put(`${this.baseUrl}/${priorityId}`, priority);
  }

  delete(priorityId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${priorityId}`);
  }
}
