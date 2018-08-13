import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { Project } from '../_models/index';
import { environment } from '../../environments/environment';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<Project[]>('/api/v1/projects');
    }
}