import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/category`;

    //this.baseUrlJson = `http://localhost:3000/categories`;
  }

  create(category: Category) {
    return this.httpClient.post(this.baseUrl,category);
  }

  getAll() {
    return this.httpClient.get<Category[]>(this.baseUrl);
  }

  getById(categoryId: string) {
    return this.httpClient.get<Category>(`${this.baseUrl}/${categoryId}`);
  }

  update(categoryId: string, category: Category) {
    return this.httpClient.put(`${this.baseUrl}/${categoryId}`, category);
  }

  delete(categoryId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${categoryId}`);
  }
}
