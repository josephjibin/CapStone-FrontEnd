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
    this.baseUrl = `http://localhost:3000/categories`;
  }

  create(category: Category) {
    return this.httpClient.post(this.baseUrl,category);
  }
}
