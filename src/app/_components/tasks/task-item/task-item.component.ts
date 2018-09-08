import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Task, Project } from '../../../_models';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass']
})

export class TaskItemComponent implements OnInit {
  @Input() project: Project;
  @Input() task: Task;
  @Input() index;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateDeadline: EventEmitter<Task> = new EventEmitter();
  @Output() onComplete: EventEmitter<Task> = new EventEmitter();
  @Output() onMove: EventEmitter<any> = new EventEmitter();
  
  modalRef: BsModalRef;
  commentCount: number = 0;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    this.commentCount = this.task.relationships.comments.data.length;
  }

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

  updateDeadline(date: Date) {
    this.task.attributes.deadline = date.toISOString();
    this.onUpdateDeadline.emit(this.task);
  }

  updateCommentCount(count: number) {
    this.commentCount = count;
  }

  isDeadlined() {
    if(this.task.attributes.deadline) { 
      return new Date(this.task.attributes.deadline) > new Date();
    }
  }
}