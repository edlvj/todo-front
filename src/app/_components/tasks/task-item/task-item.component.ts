import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Task } from '../../../_models';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass']
})

export class TaskItemComponent {
  @Input() task: Task;
  @Input() index;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateDeadline: EventEmitter<Task> = new EventEmitter();
  @Output() onComplete: EventEmitter<Task> = new EventEmitter();
  @Output() onMove: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  temporaryDate: Date;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onEdit(task: Task){  
    task.editable = true;
  }

  moveUp(task: Task, index){
    this.onMove.emit({task: task, index: index, new_index: index - 1, type: 'up'});
  }

  moveDown(task: Task, index){
    this.onMove.emit({task: task, index: index, new_index: index + 1, type: 'down'});
  }

  completeTask(completed){
    this.task.attributes.done = completed;
    this.onComplete.emit(this.task);
  }
}