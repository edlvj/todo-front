import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Project } from '../_models';
import { ProjectService } from '../_services';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})

export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.getAll().pipe(first()).subscribe(projects => { 
            this.projects = projects; 
        });
    }

}