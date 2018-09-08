import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../_models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html'
})

export class CommentItemComponent {
  @Input() comment: Comment;
  @Output() onDelete: EventEmitter<Comment> = new EventEmitter();
  constructor() {}


  getFilePath(url: string) {
    return `${environment.rootApi}${url}`;
  }
}