import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { Priorities } from 'src/app/core/models/priorities';
import { PrioritiesService } from 'src/app/core/services/priorities.service';

@Component({
  selector: 'app-add-edit-priorities',
  templateUrl: './add-edit-priorities.component.html',
  styleUrls: ['./add-edit-priorities.component.css']
})
export class AddEditPrioritiesComponent implements OnInit {
  @ViewChild('addEdit')
  public addEdit!: NgForm;
  model = new Priorities();
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prioritiesService: PrioritiesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {this.id = this.route.snapshot.params['id'];
  this.isAddMode = !this.id;
console.log('ddd');
  if (!this.isAddMode) {
    this.prioritiesService
      .getById(this.id)
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
      this.createPriority();
    } else {
      this.updatePriority();
   }
  }

  private createPriority() {
    this.prioritiesService
      .create(this.addEdit.value)
      this.loading = false;
      /*.subscribe({
        next: () => {
          this.alertService.success('Priority added', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error.error);
          this.loading = false;
        },
      });*/
  }

  private updatePriority() {
    this.prioritiesService
      .update(this.id, this.addEdit.value)
      this.loading = false;
      /*.subscribe({
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
      });*/
  }

}








 
