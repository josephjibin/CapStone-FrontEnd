import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Todo } from 'src/app/core/models/todos';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  todos!: Todo[];
  isDeleting!: boolean;
  constructor(private todoService : TodoService) { }

  ngOnInit() {
    this.isDeleting = false;
    this.todoService
      .getAll()
      .subscribe((todos) => console.log((this.todos = todos)));
  }

  deleteTodo(todoId: string) {
    const todo = this.todos.find((x) => x.id === todoId);
    this.isDeleting = true;
    this.todoService
      .delete(todoId)
      .subscribe(() => {
        this.todos = this.todos.filter(
          (x) => x.id !== todoId
        );
        this.isDeleting = false;
      });
  }

}
