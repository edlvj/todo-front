import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Task } from '../../../_models';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'task-deadline-form',
  templateUrl: './task-deadline-form.component.html'
})

export class TaskDeadlineFormComponent implements OnInit {
  @Input() task: Task;
  @Input() modalRef: BsModalRef;
  @Output() updateDeadline: EventEmitter<Task> = new EventEmitter();
  
  deadlineDate: any = new Date();
  
  constructor() {}

  ngOnInit() {
    if(this.task.attributes.deadline) {
      this.deadlineDate = new Date(this.task.attributes.deadline);
    }
  }
}  
