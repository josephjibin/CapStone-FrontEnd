import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories !: Category[];
  
  constructor(private categoryService: CategoryService) {
    
  }

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

}
