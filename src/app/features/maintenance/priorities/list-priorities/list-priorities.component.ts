import { Component, OnInit } from '@angular/core';
import { Priorities } from 'src/app/core/models/priorities';
import { PrioritiesService } from 'src/app/core/services/priorities.service';

@Component({
  selector: 'app-list-priorities',
  templateUrl: './list-priorities.component.html',
  styleUrls: ['./list-priorities.component.css']
})
export class ListPrioritiesComponent implements OnInit {
  priorities!: Priorities[];
  constructor(private prioritiesService : PrioritiesService) { }

  ngOnInit() {
   
    this.prioritiesService
      .getAll()
      .subscribe((priorities) => (this.priorities = priorities));
  }

}
