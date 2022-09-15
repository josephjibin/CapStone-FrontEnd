import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RoleService } from 'src/app/core/services/role.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.css'],
})
export class AddEditRolesComponent implements OnInit {
  @ViewChild('addEdit')
  public addEdit!: NgForm;
  model = new Role();

  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
console.log('ddd');
    if (!this.isAddMode) {
      this.roleService
        .getById(this.id)
        .pipe(first())
        .subscribe((x: Role) => (this.model = x));
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
      this.createRole();
    } else {
      this.updateRole();
    }
  }

  private createRole() {
    this.roleService
      .create(this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Role added', {
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

  private updateRole() {
    this.roleService
      .update(this.id, this.addEdit.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Role updated', {
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
