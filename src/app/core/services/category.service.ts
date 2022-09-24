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
    this.baseUrl = `${environment.baseUrl}/role`;
  }

  create(category: Category) {
    console.log("category has been created");
    console.log(category);
    return this.httpClient.get(this.baseUrl);
  }

}
