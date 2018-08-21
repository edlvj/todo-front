import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.sass']
})

export class TaskEditFormComponent implements OnInit {
  taskEditForm: FormGroup;
  @Input() task: Task;
  @Output() edit: EventEmitter<Task> = new EventEmitter();
  temporaryTaskTitle: String;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.temporaryTaskTitle = this.task.attributes.title;
    this.taskEditForm = this.formBuilder.group({
        title: [this.temporaryTaskTitle, Validators.required]
    });
  }

  onSubmit() {
    this.task.attributes.title = this.taskEditForm.controls['title'].value;
    this.edit.emit(this.task);
  }

  onCloseForm() {
      this.task.editable = false;
  }
}  