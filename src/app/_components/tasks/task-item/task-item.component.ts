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
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateDeadline: EventEmitter<Task> = new EventEmitter();
  @Output() onComplete: EventEmitter<Task> = new EventEmitter();

  modalRef: BsModalRef;
  temporaryDate: Date;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  onEdit(task: Task){
      task.editable = true;
  }
}