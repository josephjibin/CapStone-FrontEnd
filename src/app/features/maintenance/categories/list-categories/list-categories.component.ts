import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categories!: Category[];
  isDeleting!: boolean;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.isDeleting = false;
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  deleteCategory(categoryId: string) {
    const category = this.categories.find((x) => x.id === categoryId);
    this.isDeleting = true;
    this.categoryService
      .delete(categoryId)
      .subscribe(() => {
        this.categories = this.categories.filter(
          (x) => x.id !== categoryId
        );
        this.isDeleting = false;
      });
  }
}