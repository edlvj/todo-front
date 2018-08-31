import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Task, Project } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class TaskService {
  constructor(private http: HttpClient) { }

  create(project: Project, title: String) {
      return this.http.post<Task[]>(`${environment.apiUrl}/projects/${project.id}/tasks`, {task: { title } })
          .pipe(map(task => {
              return task;
          }));
  }

  update(project: Project, task: Task, params) {
      return this.http.patch<Task[]>(`${environment.apiUrl}/projects/${project.id}/tasks/${task.id}`, { task: params })
          .pipe(map(task => {
              return task;
          }));
  }

  delete(project: Project, task: Task) {
      return this.http.delete<Task[]>(`${environment.apiUrl}/projects/${project.id}/tasks/${task.id}`)
          .pipe(map(task => {
              return task;
          }));
  }
}	