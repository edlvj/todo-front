import { Component, OnInit } from '@angular/core';

import { Project } from '../../../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ProjectService } from '../../../_services';

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
      private projectService: ProjectService) { }

    get f() { return this.projectForm.controls; }
    
    ngOnInit() {
        this.projectForm = this.formBuilder.group({
            title: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.projectForm.invalid) {
            return;
        }

        this.projectService.create(this.f.title.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                
                    this.ngFlashMessageService.showFlashMessage({
							          messages: ["<strong>Well done!</strong> You've successfully done all tasks."], 
							          dismissible: true, 
							          timeout: false,
							          type: 'success'
							      });
                },
                error => {
                	  console.log(error);
                	  
                	  this.ngFlashMessageService.showFlashMessage({
							          messages: [error.message], 
							          dismissible: true, 
							          timeout: false,
							          type: 'danger'
							      });
                	
        });
    }
}