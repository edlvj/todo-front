import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Comment } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class CommentService {
  constructor(private http: HttpClient) { }

  getAll(project, task) {
      return this.http.get<any>(`${environment.apiUrl}/projects/${project.id}/tasks/${task.id}/comments`);
  }

  create(project, task, options) {
      return this.http.post<Comment>(`${environment.apiUrl}/projects/${project.id}/tasks/${task.id}/comments`, options)
          .pipe(map(comment => {
              return comment;
          })
      );
  }
  
  delete(project, task, id) {
      return this.http.delete<Comment>(`${environment.apiUrl}/projects/${project.id}/tasks/${task.id}/comments/${id}`)
          .pipe(map(comment => {
              return comment;
          })
      );
  }
}