import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Project } from '../../../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'project-edit-form',
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.sass']
})

export class ProjectEditFormComponent implements OnInit {
  projectEditForm: FormGroup;
  @Input() project: Project;
  @Output() edit: EventEmitter<Project> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.projectEditForm = this.formBuilder.group({
        title: [this.project.attributes.title, Validators.required]
    });
  }

  onSubmit(){
    this.project.attributes.title = this.projectEditForm.controls['title'].value;
    this.edit.emit(this.project);
  }

  onCloseForm(){
    this.project.editable = false;
  }
}
