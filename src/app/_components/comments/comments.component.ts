import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../_models';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html'
})

export class CommentsComponent implements OnInit {
  @Input() task: Task;
  @Input() modalRef: BsModalRef;
  constructor() { }

  ngOnInit() {
    console.log('comments inited');
  }
}  