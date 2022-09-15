import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/core/models/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users!: User[];
  isDeleting!: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isDeleting = false;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }

  deleteUser(id: string) {
    const user = this.users.find((x) => x.id === id);
    this.isDeleting = true;
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter((x) => x.id !== id);
        this.isDeleting = false;
      });
  }
}
