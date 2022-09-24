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
  

  
}
