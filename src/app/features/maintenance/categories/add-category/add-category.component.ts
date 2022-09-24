import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {

  @ViewChild('addCategoryView')
  public addCategoryView!: NgForm;
  model = new Category();

  id!: string;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    console.log('add category');
  }

  onSubmit() {
    this.submitted = true;
    console.log('inside submit method');
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.addCategoryView.invalid) {
      console.log('Enter correct name and description');
      return;
    }
    this.loading = true;
    console.log('call createCategory method');
    this.createCategory();
  }

  private createCategory() {
    console.log('inside createCategory method');
    this.categoryService
      .create(this.addCategoryView.value)
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
}
