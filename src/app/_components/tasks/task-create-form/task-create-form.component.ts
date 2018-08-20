import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.sass']
})

export class TaskCreateFormComponent {
	taskForm: FormGroup;
	formButtons: Boolean = false;

  @Output() create: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { 
      this.taskForm = this.formBuilder.group({
          title: ['', Validators.required]
      });
  }

  onSubmit(){
  	console.log("create")

  	this.create.emit(this.taskForm.controls.title.value);
  }
}  