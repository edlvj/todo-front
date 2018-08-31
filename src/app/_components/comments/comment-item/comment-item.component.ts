import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html'
})

export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {}
}  