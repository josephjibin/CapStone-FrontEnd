import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Todo } from 'src/app/core/models/todos';
import { SearchService } from 'src/app/core/services/search.service';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  term: string = "";
  todos!: Todo[];
  isDeleting!: boolean;
  constructor(private todoService : TodoService, private searchService : SearchService) { }

  ngOnInit() {
    this.isDeleting = false;

    this.searchService.search.subscribe( searchTerm => {
      this.term = searchTerm;
      this.todoService.search(this.term).subscribe( todoData => {
        this.todos = todoData
      });
    });

  }

  getStyle(todo: Todo) : string {
    let today = new Date().toISOString().split('T')[0];
    let due = new Date(todo.dueDate!).toISOString().split('T')[0];;

    if (due && due<today) {
      if (!todo.isCompleted) {
      return "overdue";
      }
    }

    if (todo.isCompleted && todo.isCompleted == true)
      return "completed";

    return "normal";
  }

  setCompleted(todo: Todo) {
    this.todoService.setCompleted(todo).subscribe( x => {

      this.todoService.search(this.term).subscribe( todoData => {
        this.todos = todoData
      });
      
    });
  }

  deleteTodo(todoId: string) {
    if(window.confirm('Are sure you want to delete this item?')) {
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
}
