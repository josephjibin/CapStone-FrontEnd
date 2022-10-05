import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
 import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories !: Category[];

  constructor(private categoryService: CategoryService, private alertService: AlertService) {

  }
  ngOnInit(): void {
    this.getCategories();// extrct method to apply DRY
  }
  private getCategories() {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }
  public deleteCategory(category: Category) {
    this.categoryService
      .delete(category.id)
      .subscribe({
        next: () => {
          this.alertService.success(`A category ${category.name} has been deleted`);
          this.getCategories()
        },
        error: (error) => {
          this.alertService.error(error.error);
        },
      });
  }

}
