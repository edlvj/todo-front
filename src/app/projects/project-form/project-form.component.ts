import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass']
});

export class ProjectFormComponent {

  @Output() create: EventEmitter<string> = new EventEmitter();
  name: string = '';
  formButtons: Boolean = false;

  constructor() { }

  onSubmit(){
    this.create.emit(this.name);
  }
}