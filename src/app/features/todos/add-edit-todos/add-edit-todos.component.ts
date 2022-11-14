import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/internal/operators/first';
import { Category } from 'src/app/core/models/category';
import { Priorities } from 'src/app/core/models/priorities';
import { Todo } from 'src/app/core/models/todos';
import { User } from 'src/app/core/models/user';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { PrioritiesService } from 'src/app/core/services/priorities.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-edit-todos',
  templateUrl: './add-edit-todos.component.html',
  styleUrls: ['./add-edit-todos.component.css']
})
export class AddEditTodosComponent implements OnInit {
  @ViewChild('addEdit')
  public addEdit!: NgForm;
  model = new Todo();
  datePicker!: NgbDateStruct;
  priorities!: Priorities[];
  categories!: Category[];
  users!: User[];

  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  today!: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private alertService: AlertService,
    private prioritiesService: PrioritiesService,
    private categoriesService: CategoryService,
    private usersService:UserService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.todoService
        .getById(this.id)
        .pipe(first())
        .subscribe((x: Todo) => (this.model = x));
    }
    this.prioritiesService
    .getAll()
    .subscribe((priorities) => console.log((this.priorities = priorities)),
    );
    this.categoriesService
    .getAll()
    .subscribe((categories) => console.log((this.categories = categories)),
    );
    this.usersService
    .getAll()
    .subscribe((users) => console.log((this.users = users)),
    );
    this.today = new Date().toISOString().split('T')[0];
    console.log("date"+this.today);
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
      this.createTodo();
    }
    else {//if is not added mode then update exist entity
    this.updateTodo();
    }
  }


  private createTodo() {
    this.todoService
      .create(this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('A new to-do has been  added ', {
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
  private updateTodo() {
    this.todoService
      .update(this.id, this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('To-do updated', {
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
  public deleteTodo() {
    this.todoService
      .delete(this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('This to-do has been deleted', {
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

