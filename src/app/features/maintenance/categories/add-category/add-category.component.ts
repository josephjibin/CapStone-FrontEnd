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
  categories : Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(data => {
      this.categories=data;
      console.log(this.categories);
     }
     );
    console.log('Add category begin');
  }

  onSubmit() {
    this.submitted = true;
    console.log('inside submit method');
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.addCategoryView.invalid) {
      alert('Name and description are required to proceed.');
      return;
    }
    this.loading = true;
    console.log('call createCategory method');
    this.createCategory();
  }

  private createCategory() {
    this.categoryService
      .create(this.addCategoryView.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('A new category has been  added ', {
            keepAfterRouteChange: true,
          });

          //uncomment following to return the categories link
          //this.router.navigate(['../'], { relativeTo: this.route });

          this.loading=false;
          this.addCategoryView.reset();

          //print the list of categories on console
          this.categoryService.getCategoryList().subscribe(data => {
            this.categories=data;
            console.log(this.categories);
           }
           );
        },
        error: (error) => {
          this.alertService.error(error.error);
          this.loading = false;
        },
      });
  }
}
