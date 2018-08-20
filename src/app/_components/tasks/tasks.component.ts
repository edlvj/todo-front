import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project, Task } from '../../_models';
import { first } from 'rxjs/operators';

import { TaskService } from '../../_services';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class TasksComponent implements OnInit {
	@Input() project: Project;

	tasks: Task[];
  
  ngOnInit() {
    console.log('hello tasks');
    this.tasks = this.project.relationships.tasks;
  }

  constructor(private taskService: TaskService) {}

  create(title: string){
  	console.log(this.project);
    //console.log("sasasa");

    console.log(title);

    this.taskService.create(this.project, title)
    .pipe(first())
    .subscribe(
        task => {
            console.log(task);
        },
        errors => {
            console.log(errors);
        });
  }	
}
