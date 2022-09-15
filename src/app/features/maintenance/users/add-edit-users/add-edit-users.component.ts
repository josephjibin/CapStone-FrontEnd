import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css'],
})
export class AddEditUsersComponent implements OnInit {
  @ViewChild('addEdit')
  public addEdit!: NgForm;
  model = new User();

  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe((x: User) => (this.model = x));
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
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .create(this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added', {
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

  private updateUser() {
    this.userService
      .update(this.id, this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User updated', {
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
}
