import { Component, OnInit } from '@angular/core';

import { Project } from '../../../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ProjectService } from '../../../_services';
import { DataStore } from '../../../_helpers'

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass']
})

export class ProjectFormComponent implements OnInit {
    projectForm: FormGroup;
    formButtons: Boolean = false;
    
    constructor(
      private formBuilder: FormBuilder,
      private ngFlashMessageService: NgFlashMessageService,
      private projectService: ProjectService,
      private dataStore: DataStore
    ) { }

    get f() { return this.projectForm.controls; }
    
    ngOnInit() {
        this.projectForm = this.formBuilder.group({
            title: ['', Validators.required]
        });
    }

    addToStore(project) {
        let allProjects = this.dataStore.store.getValue();

        allProjects.data.push(project.data);
        this.dataStore.store.next(allProjects);
    }

    onSubmit() {
        if (this.projectForm.invalid) {
            return;
        }

        this.projectService.create(this.f.title.value)
            .pipe(first())
            .subscribe(
                project => {
                    this.addToStore(project);
                },
                err => {

                this.ngFlashMessageService.showFlashMessage({
                    messages: [err.errors[0]], 
                    dismissible: true, 
                    timeout: false,
                    type: 'danger'
                });
        });

        this.projectForm.reset();
    }
}