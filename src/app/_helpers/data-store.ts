import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class DataStore {
  store = new Subject<any>();

  // updateData(data: any) {
  //   this._dataStore.next(data);
  // }
}
