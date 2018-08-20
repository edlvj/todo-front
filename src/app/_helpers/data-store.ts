import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class DataStore {
  store = new BehaviorSubject<any>([]);
}
