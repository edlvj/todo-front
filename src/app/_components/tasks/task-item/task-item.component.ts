import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Task } from '../../../_models';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass']
})

export class TaskItemComponent implements OnInit {
  @Input() task: Task;

	constructor() {}

	ngOnInit() {
    //this.temporaryDate = this.task.deadline;
  }
}