import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-add-edit-categories',
  templateUrl: './add-edit-categories.component.html',
  styleUrls: ['./add-edit-categories.component.css']
})
export class AddEditCategoriesComponent implements OnInit {
  @ViewChild('addEdit')
  public addEdit!: NgForm;
  model = new Category();

  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.categoryService
        .getById(this.id)
        .pipe(first())
        .subscribe((x: Category) => (this.model = x));
    }
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.addEdit.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createCategory();
    }
    else {//if is not added mode then update exist entity
    this.updateCategory();
    }
  }

  private createCategory() {
    this.categoryService
      .create(this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('A new category has been  added ', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error.error);
          this.loading = false;
        },
      });
  }
  private updateCategory() {
    this.categoryService
      .update(this.id, this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Category updated', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error.error);
          this.loading = false;
        },
      });
  }
  public deleteCategory() {
    this.categoryService
      .delete(this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('A category has been deleted', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error.error);
          this.loading = false;
        },
      });
  }
}
