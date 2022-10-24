import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ToDo } from 'src/app/core/models/toDo';
import { ToDoService } from 'src/app/core/services/toDo.service';

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit {
toDoes! : ToDo[];
//isDeleting!: boolean;
  constructor(private todoService : ToDoService) { }

  ngOnInit(){
    //this.isDeleting = false;
    this.todoService
      .getAll()
      .pipe(first())
      .subscribe((toDo) => (this.toDoes = toDo));
  }

}
