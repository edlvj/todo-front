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
    modalRef: BsModalRef;

    constructor(
      private projectService: ProjectService,
      private modalService: BsModalService,
      private dataStore: DataStore
      ) {}

    ngOnInit() {
        this.projectService.getAll().pipe(first()).subscribe(projects => {
            console.log(this.dataStore);
            this.dataStore.store.next(projects);
        });

        this.dataStore.store.subscribe(projects => {
          this.projects = projects;
        });
    }

    onDelete(project: Project) {
    }

    onEdit(project: Project){
        project.editable = true;
    }

    closeEditForm(project: Project){
        project.editable = false;
    }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
}