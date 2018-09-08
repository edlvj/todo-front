import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Project } from '../_models';
import { environment } from '../../environments/environment';
 
@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/projects`);
    }

    create(title) {
        return this.http.post<Project[]>(`${environment.apiUrl}/projects`, {project: { title }})
            .pipe(map(project => {
                return project;
            }));
    }

    update(id, title) {
        return this.http.patch<Project[]>(`${environment.apiUrl}/projects/${id}`, {project: { title }})
            .pipe(map(project => {
                return project;
            }));
    }

    delete(id) {
        return this.http.delete<Project>(`${environment.apiUrl}/projects/${id}`)
            .pipe(map(project => {
                return project;
            }));
    }
}