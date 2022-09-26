import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Priorities } from 'src/app/core/models/priorities';
import { PrioritiesService } from 'src/app/core/services/priorities.service';

@Component({
  selector: 'app-list-priorities',
  templateUrl: './list-priorities.component.html',
  styleUrls: ['./list-priorities.component.css']
})

export class ListPrioritiesComponent implements OnInit {
  priorities!: Priorities[];
  isDeleting!: boolean;
  constructor(private prioritiesService : PrioritiesService) { }

  ngOnInit() {
    this.isDeleting = false;
    this.prioritiesService
      .getAll()
      .pipe(first())
      .subscribe((priorities) => (this.priorities = priorities));
  }

  deletePriorities(id: string) {
    const priorities = this.priorities.find((x) => x.id === id);
    this.isDeleting = true;
    this.prioritiesService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.priorities = this.priorities.filter((x) => x.id !== id);
        this.isDeleting = false;
      });
}

}
