import { Component, OnInit, TemplateRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { Project } from '../../_models';
import { ProjectService } from '../../_services';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataStore } from '../../_helpers'

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})

export class ProjectsComponent implements OnInit {
    projects: Project[] = [];
    included: any;
    modalRef: BsModalRef;

    constructor(
      private projectService: ProjectService,
      private modalService: BsModalService,
      private dataStore: DataStore
    ) {}

    ngOnInit() {
        this.projectService.getAll().pipe(first()).subscribe(projects => {
            this.dataStore.store.next(projects);
        });

        this.dataStore.store.subscribe(projects => {
          this.projects = projects.data;
          this.included = projects.included;
        });
    }

    deleteFromStore(project) {
      let allProjects = this.dataStore.store.getValue();

      let filteredProjects = allProjects.data.filter(function(p) {
        return p.id != project.data.id;
      });

      allProjects.data = filteredProjects;
      this.dataStore.store.next(allProjects); 
    }

    onDelete(project: Project) {
      this.projectService.delete(project.id).pipe(first()).subscribe(p => {
        this.deleteFromStore(p);
      });
    }

    onEdit(project: Project){
        project.editable = true;
    }

    updateStore(project) {
      let allProjects = this.dataStore.store.getValue();

      let index = allProjects.data.indexOf(project);
      allProjects[index] = project;

      this.dataStore.store.next(allProjects);
    }

    onEditSubmit(project: Project) {
      this.projectService.update(project.id, project.attributes.title).pipe(first()).subscribe(p => {
        this.updateStore(p);
        project.editable = false;
      });
    }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
}