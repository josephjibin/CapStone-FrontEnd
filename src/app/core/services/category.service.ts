import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl;
  private url;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `http://localhost:3000/categories`;
    this.url = 'https://api.npoint.io/27d50df5539c713fd486';
  }

  create(category: Category) {
    return this.httpClient.post(this.baseUrl,category);
  }
  getAll() {
    return this.httpClient.get<Category[]>(this.url);
  }
}
/*
export class CategoryService {
 // private baseUrl;
  private url;
  constructor(private httpClient: HttpClient) {
    //this.baseUrl = `${environment.baseUrl}/user`;
    this.url = 'https://api.npoint.io/27d50df5539c713fd486';
  }
  getAll() {
    return this.httpClient.get<Category[]>(this.url);
  }
}
*/