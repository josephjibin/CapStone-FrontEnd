import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/core/models/models';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css'],
})
export class ListRolesComponent implements OnInit {
  roles!: Role[];
  isDeleting!: boolean;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.isDeleting = false;
    this.roleService
      .getAll()
      .pipe(first())
      .subscribe((roles) => (this.roles = roles));
  }

  deleteRole(roleId: string) {
    const role = this.roles.find((x) => x.id === roleId);
    this.isDeleting = true;
    this.roleService
      .delete(roleId)
      .pipe(first())
      .subscribe(() => {
        this.roles = this.roles.filter(
          (x) => x.id !== roleId
        );
        this.isDeleting = false;
      });
  }
}
